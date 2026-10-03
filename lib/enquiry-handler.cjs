const { createHash } = require('node:crypto');

module.exports = async function enquiry(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.headers.origin && !['https://www.nura-interiors.com', 'https://nura-interiors.com', 'https://nura-publish.vercel.app'].includes(req.headers.origin)) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }
  if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) {
    return res.status(415).json({ error: 'Expected JSON' });
  }
  let data;
  try { data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ error: 'Invalid JSON' }); }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return res.status(400).json({ error: 'Invalid enquiry' });
  const limits = { name: 150, email: 254, message: 10000, location: 200, projectType: 100, budget: 100, utm_source: 200, utm_medium: 200, utm_campaign: 200, landing_page: 500, enquiry_page: 500, referrer_host: 253 };
  const fields = {};
  for (const [key, limit] of Object.entries(limits)) {
    const value = data[key] ?? '';
    if (typeof value !== 'string' || value.length > limit) return res.status(400).json({ error: 'Invalid field: ' + key });
    fields[key] = value.trim();
  }
  if (!fields.name || !fields.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || /[\r\n]/.test(fields.name + fields.email)) {
    return res.status(400).json({ error: 'Name, valid email and project description are required' });
  }
  if (data.website) return res.status(400).json({ error: 'Invalid enquiry' });
  if (!process.env.RESEND_API_KEY || !process.env.ENQUIRY_FROM) {
    return res.status(503).json({ error: 'Email service is not configured' });
  }
  if (data.lead_id !== undefined && (typeof data.lead_id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.lead_id))) return res.status(400).json({ error: 'Invalid lead ID' });
  const leadId = data.lead_id || createHash('sha256').update(JSON.stringify(fields)).digest('hex');
  const text = 'lead_id: '+leadId+'\n\n'+Object.entries(fields).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`).join('\n\n');
  const idempotency = createHash('sha256').update(leadId+JSON.stringify(fields)).digest('hex');
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotency },
      body: JSON.stringify({ from: process.env.ENQUIRY_FROM, to: [process.env.ENQUIRY_TO || 'studio@nura-interiors.com'], reply_to: fields.email, subject: 'New Nura website enquiry', text }),
      signal: AbortSignal.timeout(12000)
    });
    const result = await response.json();
    if (!response.ok || !result.id) return res.status(502).json({ error: 'Email service could not accept the enquiry' });
    return res.status(200).json({ ok: true, lead_id: leadId });
  } catch {
    return res.status(502).json({ error: 'Email service is unavailable' });
  }
};

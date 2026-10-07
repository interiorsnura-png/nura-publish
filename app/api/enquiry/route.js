import handler from '../../../lib/enquiry-handler.cjs';

export const runtime = 'nodejs';
export const maxDuration = 60;
export async function POST(request) {
  let status = 200;
  let body;
  const headers = new Headers();
  const response = {
    setHeader(key, value) { headers.set(key, value); },
    status(code) { status = code; return this; },
    json(value) { body = value; return this; }
  };
  await handler({method: 'POST', headers: Object.fromEntries(request.headers), body: await request.text()}, response);
  return Response.json(body, {status, headers});
}
export function GET() {
  return Response.json({error: 'Method not allowed'}, {status: 405, headers: {Allow: 'POST', 'Cache-Control': 'no-store'}});
}

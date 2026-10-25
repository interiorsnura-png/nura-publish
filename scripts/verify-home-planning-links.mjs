import assert from 'node:assert/strict';
import {load} from 'cheerio';
const base=process.env.SEO_BASE_URL||'http://127.0.0.1:3011';
const response=await fetch(base+'/');assert.equal(response.status,200);
const $=load(await response.text());
const expected=[
 ['/guides/bespoke-kitchens','Plan your bespoke kitchen'],
 ['/post/how-to-compare-bespoke-kitchen-quotes-in-london','How to compare kitchen quotations'],
 ['/post/how-to-choose-the-right-worktop-for-your-kitchen','Compare kitchen worktop materials'],
 ['/services/wardrobes-dressing-rooms','Bespoke fitted wardrobes']
];
assert.equal($('#home-planning').length,1);assert.equal($('#home-planning h3 a').length,3);
assert.equal($('#home-planning').next('section').attr('id'),'faq');
for(const [href,label] of expected){
 const link=$(`#home-planning a[href="${href}"],#services a.home-joinery-link[href="${href}"]`);
 assert.equal(link.length,1);assert.ok(link.text().includes(label));assert.notEqual(link.attr('rel'),'nofollow');
 const target=await fetch(base+href);assert.equal(target.status,200,href);
 const page=load(await target.text());assert.equal(page('link[rel=canonical]').attr('href'),'https://www.nura-interiors.com'+href);
}
assert.match($('.studio-actions a[href="/london"]').text(),/Visit our Fulham kitchen showroom/);
assert.equal($('style[data-nura-style="/nura-home-planning.css"]').length,1);
const stylesheet=await fetch(base+'/nura-home-planning.css');assert.equal(stylesheet.status,200);
assert.equal($('style[data-nura-style="/nura-home-planning.css"]').text().replace(/\r\n/g,'\n'),(await stylesheet.text()).replace(/\r\n/g,'\n'),'Homepage performance pipeline must inline the real planning stylesheet');
assert.equal($('h1').length,1);assert.equal($('#contact form').length,1);assert.equal($('link[rel=canonical]').attr('href'),'https://www.nura-interiors.com/');
console.log('Homepage contextual links: 3 guides, wardrobes and clarified Fulham anchor passed; all destination canonicals and CSS resolve.');

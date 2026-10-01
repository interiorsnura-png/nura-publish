import assetMap from './asset-map.json';
export const siteUrl = 'https://www.nura-interiors.com';
export const organization = {
  '@context':'https://schema.org', '@type':'ProfessionalService', '@id':siteUrl+'/#organization',
  name:'Nura Interiors', url:siteUrl+'/', email:'studio@nura-interiors.com', telephone:'+44 20 7123 6949',
  address:{'@type':'PostalAddress',streetAddress:'367 Fulham Palace Road',addressLocality:'London',postalCode:'SW6 6TA',addressCountry:'GB'},
  image:siteUrl+'/assets/selected/nura-hero-shot.jpeg', priceRange:'GBP 5,000 - 100,000',
  description:'Bespoke kitchens and architectural joinery for private homes, architects and interior designers.',
  areaServed:[{ '@type':'City', name:'London' },{ '@type':'City', name:'Dubai' }],
  sameAs:['https://www.linkedin.com/company/nura-interiors'],
  logo:siteUrl+'/assets/nura-wordmark.svg'
};
export function absoluteImage(filename?:string) {
  if(!filename)return undefined;
  const mapped=(assetMap as Record<string,string>)[filename]||filename;
  return new URL(mapped,siteUrl).href;
}
export const listingMetadata:Record<string,{title:string;description:string}>={
  '/projects':{title:'Bespoke Kitchen & Joinery Projects | Nura Interiors',description:'Explore Nura kitchen and architectural joinery projects, with material specifications, photographs and design details.'},
  '/services':{title:'Bespoke Kitchens & Joinery Services | Nura Interiors',description:'Explore bespoke kitchen, architectural joinery, wardrobe and fitted furniture services. Discuss your brief with Nura Interiors.'},
  '/journal':{title:'Kitchen & Joinery Design Journal | Nura Interiors',description:'Read the Nura journal for kitchen design, materials, lighting, worktops and the practical decisions behind bespoke interiors.'},
  '/inspiration':{title:'Kitchen & Joinery Inspiration | Nura Interiors',description:'Explore materials, finishes, storage, lighting and details for bespoke kitchens and architectural joinery.'}
};

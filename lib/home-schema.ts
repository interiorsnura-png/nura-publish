import {organization,siteUrl} from './seo';
const clientReviews=[
 {author:'Natalia Wojda',body:"We couldn't be happier with the work Nura carried out for us."},
 {author:'Florina Trusescu',body:'Visited Nura recently at their newly opened showroom.'},
 {author:'Adam Tariq',body:'What impressed us just as much was the service throughout the project.'}
].map((review,index)=>({
 '@type':'Review','@id':siteUrl+'/#client-review-'+(index+1),
 author:{'@type':'Person',name:review.author},reviewBody:review.body,
 reviewRating:{'@type':'Rating',ratingValue:5,bestRating:5,worstRating:1},
 itemReviewed:{'@id':organization['@id']}
}));
const hours=[{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday'],opens:'09:30',closes:'18:00'}];
const studio=(city:string,street:string,country:string,postalCode?:string)=>({
 '@type':'ProfessionalService','@id':siteUrl+'/'+city.toLowerCase()+'#showroom',name:'Nura Interiors — '+city+' showroom',url:siteUrl+'/'+city.toLowerCase(),
 parentOrganization:{'@id':organization['@id']},email:organization.email,telephone:city==='London'?'+442071236949':'+971506691090',
 ...(city==='Dubai'?{hasMap:'https://www.google.com/maps/search/?api=1&query=Burlington%20Tower%2C%20Marasi%20Dr%2C%20Business%20Bay%2C%20Dubai'}:{}), priceRange:'GBP 5,000 - 100,000', image:siteUrl+'/assets/selected/nura-hero-shot.jpeg',address:{'@type':'PostalAddress',streetAddress:street,addressLocality:city,addressCountry:country,...(postalCode?{postalCode}:{})},openingHoursSpecification:hours
});
export const homeSchema={
 '@context':'https://schema.org','@graph':[
 {...organization,review:clientReviews},
 {'@type':'WebSite','@id':siteUrl+'/#website',url:siteUrl+'/',name:'Nura Interiors',publisher:{'@id':organization['@id']},inLanguage:'en-GB'},
 {'@type':'WebPage','@id':siteUrl+'/#webpage',url:siteUrl+'/',name:'Nura — Bespoke kitchens & joinery',isPartOf:{'@id':siteUrl+'/#website'},about:{'@id':organization['@id']},mainEntity:{'@id':siteUrl+'/#interior-services'},inLanguage:'en-GB'},
 studio('London','367 Fulham Palace Road','GB','SW6 6TA'),
 studio('Dubai','Burlington Tower, Marasi Dr, Business Bay','AE'),
 {'@type':'Service','@id':siteUrl+'/#interior-services',name:'Bespoke kitchens and architectural joinery',serviceType:'Bespoke kitchen and fitted furniture design, manufacture and installation',provider:{'@id':organization['@id']},areaServed:organization.areaServed,hasOfferCatalog:{'@id':siteUrl+'/#service-catalog'}},
 {'@type':'OfferCatalog','@id':siteUrl+'/#service-catalog',name:'Nura bespoke interiors services',itemListElement:[
  {'@type':'Offer',itemOffered:{'@type':'Service',name:'Bespoke kitchens',url:siteUrl+'/services/bespoke-kitchens'}},
  {'@type':'Offer',itemOffered:{'@type':'Service',name:'Architectural joinery',url:siteUrl+'/services/architectural-joinery'}},
  {'@type':'Offer',itemOffered:{'@type':'Service',name:'Complete homes',url:siteUrl+'/services/living-spaces'}}
 ]}
 ]
};

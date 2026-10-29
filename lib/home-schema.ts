import {organization,siteUrl} from './seo';
import homeImages from './home-images.json';
import {homeModified} from './content-dates';
import {homeMetadata} from './home-metadata';
const clientReviews=[
 {author:'Natalia Wojda',body:"We couldn't be happier with the work Nura carried out for us."},
 {author:'Florina Trusescu',body:'Visited Nura recently at their newly opened showroom.'},
 {author:'Adam Tariq',body:'What impressed us just as much was the service throughout the project.'}
].map((review,index)=>({
 '@type':'Quotation','@id':siteUrl+'/#client-review-'+(index+1),
 author:{'@type':'Person',name:review.author},text:review.body,
 about:{'@id':organization['@id']},isPartOf:{'@id':siteUrl+'/#webpage'}
}));
const hours=[{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday'],opens:'09:30',closes:'18:00'}];
const studio=(city:string,street:string,country:string,postalCode?:string)=>({
 '@type':'ProfessionalService','@id':siteUrl+'/'+city.toLowerCase()+'#showroom',name:'Nura Interiors: '+city+' showroom',url:siteUrl+'/'+city.toLowerCase(),
 parentOrganization:{'@id':organization['@id']},email:organization.email,telephone:city==='London'?'+442071236949':'+971506691090',
 ...(city==='Dubai'?{hasMap:'https://www.google.com/maps/search/?api=1&query=Burlington%20Tower%2C%20Marasi%20Dr%2C%20Business%20Bay%2C%20Dubai'}:{}), priceRange:'Quoted individually according to the brief and specification', image:siteUrl+'/assets/selected/3e30b0a15f5f-1600.webp',address:{'@type':'PostalAddress',streetAddress:street,addressLocality:city,addressCountry:country,...(postalCode?{postalCode}:{})},openingHoursSpecification:city==='London'?[...hours,{'@type':'OpeningHoursSpecification',dayOfWeek:['Saturday'],opens:'10:00',closes:'16:00'}]:hours
});
export const homeSchema={
 '@context':'https://schema.org','@graph':[
 organization,
 ...clientReviews,
 ...homeImages,
 {'@type':'ImageObject','@id':siteUrl+'/kitchen-budget-hero.webp#image',contentUrl:siteUrl+'/kitchen-budget-hero.webp',width:1672,height:941,name:'Kitchen budget planning with plans and material samples',license:siteUrl+'/assets/image-license.html#kitchen-budget-hero',acquireLicensePage:siteUrl+'/assets/image-license.html#kitchen-budget-hero',creditText:'Nura Interiors',creator:{'@type':'Organization',name:'Nura Interiors'},copyrightNotice:'Nura Interiors. Permission required for reuse.'},
 {'@type':'ImageObject','@id':siteUrl+'/assets/portfolio/p10-1.webp#image',contentUrl:siteUrl+'/assets/portfolio/p10-1.webp',name:'Green stone worktop and timber drawer storage from the NURA portfolio',license:siteUrl+'/assets/image-license.html',acquireLicensePage:siteUrl+'/assets/image-license.html',creditText:'Nura Interiors',creator:{'@type':'Organization',name:'Nura Interiors'},copyrightNotice:'© Nura Interiors. All rights reserved.'},
 {'@type':'WebSite','@id':siteUrl+'/#website',url:siteUrl+'/',name:'Nura Interiors',publisher:{'@id':organization['@id']},inLanguage:'en-GB'},
 {'@type':'WebPage','@id':siteUrl+'/#webpage',url:siteUrl+'/',dateModified:homeModified,name:homeMetadata.title,description:homeMetadata.description,isPartOf:{'@id':siteUrl+'/#website'},about:{'@id':organization['@id']},mainEntity:{'@id':siteUrl+'/#interior-services'},inLanguage:'en-GB'},
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

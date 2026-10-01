import JsonLd from './JsonLd';
import {siteUrl,organization} from '../lib/seo';
const locations={
 london:{name:'Nura Interiors — London showroom',street:'367 Fulham Palace Road',city:'London',postcode:'SW6 6TA',country:'GB',address:'367 Fulham Palace Road, London, SW6 6TA, United Kingdom'},
 dubai:{name:'Nura Interiors — Dubai showroom',street:'Burlington Tower, Marasi Dr, Business Bay',city:'Dubai',postcode:undefined,country:'AE',address:'Burlington Tower, Marasi Dr, Business Bay, Dubai, United Arab Emirates'}
};
export default function StudioDetails({path}:{path:string}){
 if(!['/london','/dubai','/contact','/consultation'].includes(path))return null;
 const keys=path==='/london'?['london']:path==='/dubai'?['dubai']:['london','dubai'];
 return <section aria-label="Showroom details">{keys.map(key=>{const location=locations[key as keyof typeof locations];return <div key={key} className="studio-details"><h2>{location.name}</h2><address>{location.address}</address>{key==='london'?<p><a href="tel:+442071236949">020 7123 6949</a></p>:null}<p><a href="mailto:studio@nura-interiors.com">studio@nura-interiors.com</a></p><p>Monday–Friday: 09:30–18:00<br/>Saturday: by appointment<br/>Sunday: closed</p><p>Please contact the studio to arrange your visit.</p><JsonLd data={{'@context':'https://schema.org','@type':'ProfessionalService','@id':siteUrl+'/'+key+'#showroom',name:location.name,url:siteUrl+'/'+key,parentOrganization:{'@id':organization['@id']},email:organization.email,...(key==='london'?{telephone:'+442071236949'}:{}),address:{'@type':'PostalAddress',streetAddress:location.street,addressLocality:location.city,postalCode:location.postcode,addressCountry:location.country},openingHoursSpecification:[{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday'],opens:'09:30',closes:'18:00'}]}}/></div>})}</section>;
}

import fs from 'node:fs/promises';
import React from 'react';
import sharp from 'sharp';
import {ImageResponse} from 'next/og.js';
const photo=await fs.readFile(new URL('../public/assets/selected/nura-fulham-showroom-sign.webp',import.meta.url));
const png=await sharp(photo).png().toBuffer();
const el=React.createElement;
const card=el('div',{style:{display:'flex',width:'100%',height:'100%',background:'#f2efe8',color:'#292c28',fontFamily:'sans-serif'}},
 el('div',{style:{display:'flex',flexDirection:'column',justifyContent:'center',width:760,padding:64}},
 el('div',{style:{fontSize:27,letterSpacing:6,marginBottom:38}},'NURA INTERIORS'),
 el('div',{style:{fontSize:58,lineHeight:1.08,fontWeight:700}},'Choosing a kitchen showroom in Fulham'),
 el('div',{style:{fontSize:25,marginTop:30,lineHeight:1.4}},'Cabinet quality. Hardware. Material samples.'),
 el('div',{style:{fontSize:19,marginTop:44}},'The Nura journal | nura-interiors.com')),
 el('img',{src:'data:image/png;base64,'+png.toString('base64'),width:440,height:630,style:{objectFit:'cover'}}));
const response=new ImageResponse(card,{width:1200,height:630});
const destination=new URL('../public/assets/editorial/fulham-showroom-share.png',import.meta.url);
await fs.mkdir(new URL('../public/assets/editorial/',import.meta.url),{recursive:true});
await fs.writeFile(destination,Buffer.from(await response.arrayBuffer()));
console.log('Generated 1200x630 social card from existing showroom photography.');

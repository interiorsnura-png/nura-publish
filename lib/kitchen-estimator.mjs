export const SOURCE='https://www.smilekitchens.com/inspiration/article/how-much-does-a-new-kitchen-cost/';
export const options={size:[['compact','Compact','8 units / roughly 10 m²'],['medium','Medium','12 units / roughly 15 m²'],['large','Large','16 units / roughly 20 m²']],layout:[['straight','Straight','One run'],['l','L-shaped','Two connected runs'],['u','U-shaped','Three connected runs'],['island','With island','Count island units in total']],cabinetry:[['standard','Standard fitted','Mid-range cabinet allowance'],['bespoke','Made to measure','Broad bespoke benchmark']],worktop:[['laminate','Laminate','Package allowance'],['wood','Solid wood','Package allowance'],['stone','Quartz / stone / porcelain','Upper allowance is open-ended']],appliances:[['reuse','Keep existing','No purchase allowance'],['basic','Three appliances','Oven, hob and extractor'],['integrated','Five appliances','Mid-range integrated set']],installation:[['own','Own installer','Fitting excluded'],['include','Include fitting','General UK allowance']],services:[['exclude','Quote separately','Trades excluded'],['include','Allow for both','Plumbing and electrics']]};
export const defaults={size:'medium',layout:'l',cabinetry:'standard',worktop:'laminate',appliances:'integrated',installation:'include',services:'exclude'};
export function estimateKitchen(selection){
 for(const [key,choices] of Object.entries(options))if(!choices.some(x=>x[0]===selection[key]))throw new Error('Invalid selection: '+key);
 const units={compact:8,medium:12,large:16}[selection.size];
 const cabinet=selection.cabinetry==='bespoke'?[12000*units/12,25000*units/12]:[3000*units/12,6000*units/12];
 const top={laminate:[200,800],wood:[400,1200],stone:[1300,2000]}[selection.worktop];
 const appliances={reuse:[0,0],basic:[450,600],integrated:[1500,3000]}[selection.appliances];
 const fitting=selection.installation==='include'?[2200,4600]:[0,0],trades=selection.services==='include'?[400,3000]:[0,0];
 const rawLines=[['Cabinetry',...cabinet],['Worktops',...top],['Appliance purchases',...appliances],['Fitting',...fitting],['Plumbing and electrics',...trades]];
 // Unknown source tax basis: each range may be net or gross at standard VAT.
 // Bound both interpretations, normalise to net, then show every line including 20%.
 const lines=rawLines.map(([label,low,high])=>[label,Math.round(low),Math.ceil(high*1.2)]);
 const modelMinimum=7400;
 const componentLow=lines.reduce((s,x)=>s+x[1],0);
 const minimumAdjustment=Math.max(0,modelMinimum-componentLow);

 return {units,lines,modelMinimum,minimumAdjustment,vatRate:0.20,vatBasis:describeVatBasis(),componentLow:Math.round(componentLow),low:Math.max(modelMinimum,Math.round(componentLow)),high:Math.max(modelMinimum,Math.round(lines.reduce((s,x)=>s+x[2],0))),openEnded:selection.worktop==='stone'||selection.cabinetry==='bespoke',assumptions:selection.cabinetry==='bespoke'?'Bespoke cabinetry scales the published £12,000 to £25,000 range proportionally from an assumed 12-unit reference. Both this reference size and proportional scaling are prototype assumptions, not a supplier formula or calibrated NURA rates.':'Cabinet allowance scales the published £3,000 to £6,000 mid-range range from an assumed 12-unit reference. Proportional scaling is our prototype assumption, not a supplier formula or a calibrated NURA rate.'};
}

function describeVatBasis(){return 'All displayed allowances include a modelled standard 20% VAT. Because source tax bases are unconfirmed, the range covers both net and VAT-inclusive interpretations: source low to source high multiplied by 1.20. This widens uncertainty rather than claiming the source VAT basis is known. Reduced-rate, exempt and non-VAT-registered supplies are not modelled.';}

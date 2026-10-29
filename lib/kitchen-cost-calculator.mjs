/** @typedef {{id:string,label:string,amount:string,vat:string,included:boolean}} CostRow */

/** Parse a quoted GBP amount without floating point rounding. null=blank, undefined=invalid. */
export function parseMoney(value=''){
 const text=value.trim();if(!text)return null;
 if(!/^(?:\d{1,9}|\d{1,3}(?:,\d{3}){1,2})(?:\.\d{1,2})?$/.test(text))return undefined;
 const [whole,fraction='']=text.replaceAll(',','').split('.');
 return Number(whole)*100+Number(fraction.padEnd(2,'0'));
}
export function formatMoney(pence=0){return new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(pence/100);}

/** @param {CostRow[]} rows */
export function summariseCosts(rows,budget='',budgetVat='included'){
 const active=rows.filter(row=>row.included),priced=active.map(row=>({...row,pence:parseMoney(row.amount)}));
 const missing=priced.filter(row=>row.pence===null).map(row=>row.label),invalid=priced.filter(row=>row.pence===undefined).map(row=>row.label);
 const known=priced.filter(row=>typeof row.pence==='number');
 const total=known.reduce((sum,row)=>sum+(row.pence??0),0),vat=new Set(known.map(row=>row.vat));
 const complete=active.length>0&&!missing.length&&!invalid.length;
 const vatBasis=complete&&vat.size===1&&!vat.has('unknown')?[...vat][0]:null;
 const budgetPence=parseMoney(budget);
 const comparable=complete&&vatBasis!==null&&vatBasis===budgetVat&&typeof budgetPence==='number';
 return {total,knownCount:known.length,activeCount:active.length,missing,invalid,complete,vatBasis,budgetPence,comparable,difference:comparable?budgetPence-total:null};
}

/** @param {CostRow[]} rows */
export function buildBreakdown(rows,budget='',budgetVat='included'){
 const s=summariseCosts(rows,budget,budgetVat);
 return ['NURA kitchen quote worksheet','Amounts entered by the user, not a NURA quotation or market estimate.','',...rows.map(row=>{
  if(!row.included)return `${row.label}: not included in this worksheet`;
  const value=parseMoney(row.amount);return `${row.label}: ${value===null?'not yet entered':value===undefined?'invalid amount':formatMoney(value)} | VAT: ${row.vat}`;
 }),'',`Entered subtotal: ${s.knownCount?formatMoney(s.total):'awaiting figures'}`,`Missing amounts: ${s.missing.join(', ')||'none'}`,`Invalid amounts: ${s.invalid.join(', ')||'none'}`,`Consistent VAT basis: ${s.vatBasis||'not confirmed'}`,`Budget: ${typeof s.budgetPence==='number'?formatMoney(s.budgetPence):s.budgetPence===undefined?'invalid amount':'not entered'} | VAT: ${budgetVat}`,s.comparable?`Difference against entered figures: ${formatMoney(s.difference??0)}`:'Budget comparison unavailable until selected costs and VAT basis are complete and consistent.','','Check scope, exclusions, VAT and duplicate items with each supplier. This worksheet does not establish a final project cost.'].join('\n');
}

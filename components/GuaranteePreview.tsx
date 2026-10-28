import {guaranteeEnabled} from '../lib/guarantee-preview.mjs';
export default function GuaranteePreview(){
 if(!guaranteeEnabled())return null;
 return <section className="ng-quality" aria-labelledby="ng-quality-title"><link rel="stylesheet" href="/nura-guarantee.css"/><p className="ng-review">Our commitment, in writing</p><h2 id="ng-quality-title">Made with care.<br/><em>Backed with confidence.</em></h2><p>A 10-year guarantee against manufacturing and material defects in NURA-made cabinetry, included in your written project contract. Installation, hardware, worktops and appliances have separate terms.</p><a href="/guarantee">Explore the 10-Year Cabinetry Guarantee <span aria-hidden="true">↗</span></a></section>;
}

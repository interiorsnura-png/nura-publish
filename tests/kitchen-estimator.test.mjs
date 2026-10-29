import test from 'node:test';
import assert from 'node:assert/strict';
import {options,defaults,estimateKitchen} from '../lib/kitchen-estimator.mjs';
test('default component range adds without double-adding full kitchen benchmarks',()=>{const r=estimateKitchen(defaults);assert.equal(r.low,7400);assert.equal(r.high,17280);});
test('retained appliances and own fitting remove only those allowances',()=>{const r=estimateKitchen({...defaults,appliances:'reuse',installation:'own'});assert.equal(r.low,7400);assert.equal(r.high,8160);});
test('unknown values fail and all available selections have finite ordered ranges',()=>{assert.throws(()=>estimateKitchen({...defaults,size:'bad'}));for(const [key,choices] of Object.entries(options))for(const [value] of choices){const r=estimateKitchen({...defaults,[key]:value});assert.ok(Number.isFinite(r.low)&&r.low<=r.high);}});
test('layout has no invented uplift and bespoke scaling increases with unit count',()=>{assert.equal(estimateKitchen({...defaults,layout:'island'}).low,7400);assert.ok(estimateKitchen({...defaults,cabinetry:'bespoke',size:'compact'}).low<estimateKitchen({...defaults,cabinetry:'bespoke',size:'large'}).low);assert.equal(estimateKitchen({...defaults,worktop:'stone'}).openEnded,true);});

test('VAT uncertainty bounds both net and gross source interpretations',()=>{const r=estimateKitchen(defaults);assert.equal(r.vatRate,0.20);assert.deepEqual(r.lines[0],['Cabinetry',3000,7200]);assert.deepEqual(estimateKitchen({...defaults,appliances:'reuse'}).lines[2],['Appliance purchases',0,0]);});

test('model minimum is explicit and breakdown still balances',()=>{const r=estimateKitchen({...defaults,size:'compact',appliances:'reuse',installation:'own'});assert.equal(r.low,7400);assert.equal(r.minimumAdjustment,5200);assert.equal(r.componentLow,2200);assert.ok(!r.lines.some(x=>x[0]==='Model minimum adjustment'));assert.equal(r.high,7400);});

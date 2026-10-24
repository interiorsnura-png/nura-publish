// Called only from CUA with an already authorised browser tab and viewport capability.
// Browser actions stay in CUA. This module cannot launch a separate browser.
export async function captureJournalView({tab,viewport,width,height,saveScreenshot}){
 await viewport.set({width,height});
 await tab.getAXState({emit:false});
 const state=await tab.playwright.evaluate(()=>({
  width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,
  visibleImages:Array.from(document.querySelectorAll('.hero-image,.article-content img')).filter(x=>{const r=x.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight;}).map(x=>({alt:x.alt,complete:x.complete,naturalWidth:x.naturalWidth})),
  tableWidth:document.querySelector('.article-content table')?.getBoundingClientRect().width??null
 }));
 const ready=state.width===width&&state.height===height&&state.visibleImages.every(x=>x.complete&&x.naturalWidth>0);
 if(!ready)return {status:'pending',reason:'Viewport reflow or visible image loading incomplete; collect fresh state after loading before capture',state};
 const screenshot=await tab.getScreenshot({emit:false});await saveScreenshot(screenshot);
 return {status:state.scrollWidth<=width?'captured-needs-visual-review':'failed',state,visualReview:'pending',note:'Geometry/load checks are not a visual signoff or field performance evidence'};
}

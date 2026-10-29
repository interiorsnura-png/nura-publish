import {footerHtml} from './footer';
import {homeFaqHtml} from './home-faq';
import {homeMetadata} from './home-metadata';
// Apply reviewed enhancements without rewriting the preserved migration source.
export function improveHomeSeo(html:string){
 const escapeAttribute=(value:string)=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
 const title=escapeAttribute(homeMetadata.title),description=escapeAttribute(homeMetadata.description);
 html=html.replace(/<title>[^<]*<\/title>/,`<title>${title}</title>`)
  .replace(/(<meta\s+(?:name|property)="(?:og:title|twitter:title)"\s+content=")[^"]*("[^>]*>)/g,`$1${title}$2`)
  .replace(/(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*("[^>]*>)/g,`$1${description}$2`)
  .replace('<h1 id="hero-title">A room can<br><em>change a life.</em></h1>','<h1 id="hero-title">Bespoke kitchens<br><em>and joinery.</em></h1>')
  .replace('Kitchens and joinery made around the way you live, with a quiet confidence that lasts.','<span class="hero-slogan">A room can change a life.</span> <span class="hero-description">Discover kitchens and architectural joinery designed around you, from our London showroom in Fulham and Dubai studio.</span>')
  .replace('<section class="hero" aria-labelledby="hero-title">','<section class="hero hero-service" aria-labelledby="hero-title">')
  .replace('</head>','<link rel="stylesheet" href="/nura-home-hero.css"/></head>');
 // Owner-selected project photograph; preserve the immutable migration snapshot.
 const heroAlt='Nura kitchen with gold-toned cabinetry and a white veined stone island';
 html=html.replace(/<img\b[^>]*class="hero-image"[^>]*>/,`<img class="hero-image" width="1080" height="608" src="/assets/selected/nura-golden-kitchen-1080.webp" srcset="/assets/selected/nura-golden-kitchen-480.webp 480w, /assets/selected/nura-golden-kitchen-640.webp 640w, /assets/selected/nura-golden-kitchen-1080.webp 1080w" sizes="100vw" alt="${heroAlt}" fetchpriority="high">`)
  .replace(/(<meta\s+(?:name|property)="(?:og:image|twitter:image)"\s+content=")[^"]*("[^>]*>)/g,'$1https://www.nura-interiors.com/assets/selected/nura-golden-kitchen-1080.webp$2')
  .replace(/(<meta property="og:image:alt" content=")[^"]*("[^>]*>)/,`$1${heroAlt}$2`);
 // Match responsive downloads to the existing layout; keep the migration snapshot intact.
 const imageSizes:Record<string,string>={a52b5a2e5310:'42vw','72c3c43b54a8':'52vw','7aad5d45dd89':'36vw','5ac97f1b40d0':'36vw','788c8e2871c4':'51vw','1d6e31d7ac38':'29vw',dcc75e6202a9:'29vw','4280cc3dbd32':'29vw','62ee06975f86':'50vw'};
 html=html.replace(/<img\b[^>]*>/g,img=>{
  const key=Object.keys(imageSizes).find(id=>img.includes('/'+id+'-'));
  if(key)img=img.replace(/sizes="[^"]*"/,`sizes="(max-width: 800px) 88vw, ${imageSizes[key]}"`);
  if(key && ['a52b5a2e5310','72c3c43b54a8','7aad5d45dd89'].includes(key)){
   img=img.replace(/srcset="[^"]*"/,`srcset="/assets/selected/${key}-480.webp 480w, /assets/selected/${key}-640.webp 640w, /assets/selected/${key}-960.webp 960w, /assets/selected/${key}-${key==='a52b5a2e5310'?'1228':key==='72c3c43b54a8'?'1333':'1920'}.webp ${key==='a52b5a2e5310'?'1228':key==='72c3c43b54a8'?'1333':'1920'}w"`);
  }
  if(img.includes('/490b3031fc2f-')&&!/\bloading=/.test(img))img=img.replace('<img ','<img loading="lazy" decoding="async" ');
  return img;
 });
 html=html.replace(/<section class="faq\b[^>]*>[\s\S]*?<\/section>/,homeFaqHtml)
  .replace('</head>','<link rel="stylesheet" href="/nura-faq.css"/><meta name="msvalidate.01" content="164A92F684156746CF0F2F92F87ED5C0"/></head>');
 const mainNav='<nav class="desktop-nav nura-main-nav" aria-label="Main navigation"><a href="/projects">Projects</a><a href="/services">Services</a><a href="/process">Our process</a><a href="/journal">Journal</a><a href="/about">About</a><a href="/london">Showrooms</a><a href="/for-professionals">For professionals</a></nav>';
 html=html.replace(/\s*<nav class="desktop-nav"[^>]*>[\s\S]*?<\/nav>/,mainNav)
  .replace(/class="site-nav" aria-label="Mobile navigation"/, 'class="site-nav nura-main-nav" aria-label="Main navigation"')
  .replace(/<nav id="site-menu"[^>]*>[\s\S]*?<\/nav>/,mainNav.replace('class="desktop-nav nura-main-nav"','id="site-menu" class="site-nav nura-main-nav"'));
 html=html.replace(/<footer[\s\S]*?<\/footer>/,footerHtml);
 html=html.replace(/(<body\b[^>]*>)/,'$1<a class="nura-skip-link" href="#top">Skip to content</a>')
  .replace('<main id="top">','<main id="top" tabindex="-1">');
 return html
  .replace('<script defer src="/favicon-glow.js"></script>','')
  .replace('href="/favicon.png"','href="/favicon.png?v=rich-gold-20261012"')
  .replaceAll("01 \u2014 06","01 / 06")
  .replaceAll("feel easier\u2014not more complicated","feel easier, without adding complexity")
  .replaceAll("Dubai project \u2014 discuss in AED","Dubai project: discuss in AED")
  .replaceAll('/jointery/westover-road','/joinery/westover-road')
  .replace('<option>£25k–£50k</option>','<option>Under £25k</option><option>£25k–£50k</option>')
  .replace('A considered reply from the studio. No automated sales sequence.','A considered reply from the studio. No automated sales sequence. <a href="/privacy-policy">How we use your information</a>')
  .replace('</head>','<link rel="stylesheet" href="/nura-navigation.css"/><link rel="stylesheet" href="/nura-footer.css"/></head>')
  .replace('</body>','<script src="/nura-navigation.js" defer></script></body>')
  .replace('We design spaces that feel inevitable: considered from the first line, resolved down to the last hinge.',
   'A room can change a life when it is designed around the people who use it. Our bespoke kitchens and joinery are considered from the first line, resolved down to the last hinge.')
  .replace('</head>','<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png"/><style>.proof-row .nura-display-number{font:31px var(--serif);font-weight:400}.outcome-grid .nura-display-number{font-size:10px;letter-spacing:.15em}.nura-link-label{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}@media(max-width:800px){.proof-row .nura-display-number{font-size:27px}}</style></head>')
  .replace(/<strong>(0[123]|∞)<\/strong>/g,'<span class="nura-display-number">$1</span>')
  .replaceAll('class="nura-review-stars" aria-label=', 'class="nura-review-stars" role="img" aria-label=')
  .replace(/(<a[^>]+href="\/services\/bespoke-kitchens"[^>]*>)↗(<\/a>)/g,'$1<span class="nura-link-label">Explore bespoke kitchens</span>↗$2')
  .replace(/(<a[^>]+href="\/services\/architectural-joinery"[^>]*>)↗(<\/a>)/g,'$1<span class="nura-link-label">Explore architectural joinery</span>↗$2')
  .replace(/(<a[^>]+href="\/services\/living-spaces"[^>]*>)↗(<\/a>)/g,'$1<span class="nura-link-label">Explore bespoke living spaces</span>↗$2');
}

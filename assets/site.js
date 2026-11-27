"use strict";
const d=window.SITE_DATA,c=window.SiteCore,r=document.body.dataset.root||"", $=id=>document.getElementById(id);
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;if(cls)n.className=cls;return n;};
const money=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n);
const fmt=s=>new Intl.DateTimeFormat("en-US",{dateStyle:"medium",timeZone:"UTC"}).format(new Date(s+"T12:00:00Z"));
const img=(path,alt)=>{const i=el("img");i.src=r+path;i.alt=alt;i.loading="lazy";return i;};
function link(box,label,url){try{const u=new URL(url);if(!["https:","http:"].includes(u.protocol))return;const a=el("a",label);a.href=u.href;a.target="_blank";a.rel="noopener noreferrer";box.append(a);}catch{}}
function empty(box,msg){box.append(el("p",msg,"empty"));}
function locationBanner(){const now=new Date(),today=c.dateKey(now,d.business.timezone),day=c.weekday(now,d.business.timezone),active=c.active(d.events,today),stop=d.weekly[day];$("today").textContent=active.length?active.map(e=>e.name+" · "+e.hours).join(" / "):stop?stop.location+" · "+stop.hours:"Boise, Idaho · No confirmed stop today";const next=c.upcoming(d.events,today).find(e=>e.status==="confirmed");if($("next"))$("next").textContent=next?next.name+" · "+fmt(next.start):"Schedule coming soon";}
locationBanner();setInterval(locationBanner,60000);$("year").textContent=new Date().getFullYear();
const toggle=document.querySelector(".nav-toggle");toggle.onclick=()=>toggle.setAttribute("aria-expanded",String($("nav").classList.toggle("open")));
document.querySelectorAll("[data-photo]").forEach(n=>{const path=d.photos[n.dataset.photo];if(path)n.replaceChildren(img(path,"Idaho Five Star Funnel Cake "+n.dataset.photo+" photograph"));});
for(const [name,url] of [["Facebook",d.business.facebook],["Instagram",d.business.instagram]])if(url)link($("social"),name,url);
function filters(id,values,render){const b=$(id);if(!b)return;for(const v of ["All",...new Set(values)]){const n=el("button",v);n.type="button";n.setAttribute("aria-pressed",String(v==="All"));n.onclick=()=>{b.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",String(x===n)));render(v);};b.append(n);}}
function menu(id,items){const box=$(id);if(!box)return;box.replaceChildren();if(!items.length)return empty(box,"Menu details coming soon.");for(const m of items){const a=el("article",null,"item"),p=el("div",null,"photo");if(m.image)p.append(img(m.image,m.name));else p.append(el("span","✦"),el("small","Photo coming soon"));const h=el("div",null,"between");h.append(el("h3",m.name),el("span",m.price==null?"Varies by event":money(m.price),"price"));a.append(p,h,el("p",m.description));if(m.toppings?.length)a.append(el("p","Toppings: "+m.toppings.join(", ")));if(m.tags?.length)a.append(el("p",m.tags.join(" · ")));if(!m.available)a.append(el("p","Currently unavailable","notice"));box.append(a);}}
menu("featured",d.menu.filter(m=>m.featured).slice(0,3));menu("menu-items",d.menu);filters("menu-filters",d.menu.map(m=>m.category),v=>menu("menu-items",d.menu.filter(m=>v==="All"||m.category===v)));
const today=c.dateKey(new Date(),d.business.timezone),events=c.upcoming(d.events,today);
function eventList(id,items){const b=$(id);if(!b)return;b.replaceChildren();if(!items.length)return empty(b,"No events announced. Check back for updates.");for(const e of items){const a=el("article",null,"event"),info=el("div"),links=el("div");info.append(el("h3",e.name),el("p",[e.address,e.hours].filter(Boolean).join(" · ")));if(e.description)info.append(el("p",e.description));if(e.status==="cancelled")info.append(el("strong","Cancelled"));if(e.address)link(links,"Directions ↗",c.maps(e.address));if(e.url)link(links,"Event website ↗",e.url);a.append(el("strong",fmt(e.start)+(e.end&&e.end!==e.start?" – "+fmt(e.end):"")),info,links);b.append(a);}}
eventList("home-events",events.slice(0,3));eventList("events",events);eventList("past",d.events.filter(e=>e.status==="confirmed"&&(e.end||e.start)<today).sort((a,b)=>b.start.localeCompare(a.start)));
if($("month")){const months=new Set();for(const e of events){let dt=new Date(e.start.slice(0,7)+"-01T00:00:00Z");const end=(e.end||e.start).slice(0,7);for(let i=0;i<120&&dt.toISOString().slice(0,7)<=end;i++){months.add(dt.toISOString().slice(0,7));dt.setUTCMonth(dt.getUTCMonth()+1);}}for(const m of [...months].sort()){const o=el("option",new Intl.DateTimeFormat("en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(m+"-01T12:00:00Z")));o.value=m;$("month").append(o);}$("month").onchange=()=>{const m=$("month").value;eventList("events",events.filter(e=>!m||(e.start.slice(0,7)<=m&&(e.end||e.start).slice(0,7)>=m)));};}
if($("weekly"))for(const [day,s] of Object.entries(d.weekly)){const tr=el("tr"),th=el("th",day),td=el("td");th.scope="row";if(s?.address)link(td,"Open map ↗",c.maps(s.address));else td.textContent="—";tr.append(th,el("td",s?[s.location,s.address].filter(Boolean).join(" · "):"Not announced"),el("td",s?.hours||"—"),td);$("weekly").append(tr);}
for(const id of ["packages","book-packages"])if($(id))for(const p of d.catering.packages){const o=el("option",p.name+(id==="packages"?" — "+money(p.perGuest)+"/guest":""));o.value=p.id;$(id).append(o);}
if($("quote")){const f=$("quote");if(d.catering.approved)$("rate-note").textContent="Estimate only; final rates require confirmation.";for(const a of d.catering.addons){const l=el("label",null,"check"),i=el("input");i.type="checkbox";i.name="addon";i.value=a.id;l.append(i,document.createTextNode(a.name+" — "+money(a.perGuest||0)+"/guest"+(a.flat?" + "+money(a.flat):"")));$("addons").append(l);}function update(){const fd=new FormData(f),n=c.estimate(d.catering,Number(fd.get("guests")),fd.get("package"),Number(fd.get("hours")),fd.getAll("addon"));$("breakdown").replaceChildren();$("quote-book").href="../booking/";if(!n||!f.checkValidity()){$("total").textContent="—";return;}$("total").textContent=money(n.total);for(const [k,v] of [["Package (min. "+money(d.catering.minimum)+")",n.base],["Extra hours",n.extra],["Add-ons",n.addons]]){const line=el("div",null,"line");line.append(el("span",k),el("strong",money(v)));$("breakdown").append(line);}const params=new URLSearchParams({guests:fd.get("guests"),package:fd.get("package"),type:fd.get("type"),notes:(d.catering.approved?"Estimate":"Demo estimate")+": "+money(n.total)+"; extra hours: "+fd.get("hours")+"; add-ons: "+fd.getAll("addon").join(", ")});$("quote-book").href="../booking/?"+params; }f.addEventListener("input",update);f.addEventListener("change",update);f.addEventListener("submit",e=>e.preventDefault());update();}
function form(id,statusId,copyId){const f=$(id);if(!f)return;const status=$(statusId),copy=$(copyId);let draft="";copy.onclick=async()=>{try{await navigator.clipboard.writeText(draft);status.textContent="Copied. Nothing was sent.";}catch{const t=el("textarea");t.readOnly=true;t.value=draft;status.after(t);t.select();status.textContent="Select and copy the draft below.";}};
f.addEventListener("submit",async e=>{e.preventDefault();if(!f.reportValidity())return;if(id==="booking-form"&&(!/^[-+() .0-9]{7,25}$/.test(f.elements.phone.value)||f.elements.phone.value.replace(/[^0-9]/g,"").length<7)){status.textContent="Please enter a valid phone number.";f.elements.phone.focus();return;}if(id==="booking-form"&&f.elements.end.value<=f.elements.start.value){status.textContent="End time must be after start time (same-day events).";f.elements.end.focus();return;}const fd=new FormData(f);if(fd.get("_gotcha")){status.textContent="Unable to submit.";return;}draft=Array.from(fd).filter(([k])=>!["_gotcha","consent"].includes(k)).map(([k,v])=>k+": "+v).join("\n");if(!d.business.formEndpoint){status.textContent="Inquiry prepared, but not sent. Delivery is not configured.";copy.hidden=false;return;}let endpoint;try{endpoint=new URL(d.business.formEndpoint);if(endpoint.protocol!=="https:")throw Error();}catch{status.textContent="Invalid delivery configuration. Nothing sent.";copy.hidden=false;return;}const submit=f.querySelector("button:not([type=button])");submit.disabled=true;status.textContent="Sending…";try{const response=await fetch(endpoint.href,{method:"POST",body:fd,headers:{Accept:"application/json"}});if(!response.ok)throw Error();status.textContent="Thank you! Your inquiry was sent. A booking is not yet confirmed.";copy.hidden=true;f.reset();}catch{status.textContent="Delivery could not be confirmed. Try again or copy your inquiry.";copy.hidden=false;}finally{submit.disabled=false;}});}
if($("booking-form")){const f=$("booking-form"),p=new URLSearchParams(location.search);f.elements.date.min=today;for(const k of ["guests","package","type","notes"])if(p.has(k))f.elements[k].value=p.get(k);if(d.business.formEndpoint)$("delivery-note").textContent="Inquiries are sent to the business for review.";}
form("booking-form","booking-status","copy-booking");form("contact-form","contact-status","copy-contact");
if($("details")){const b=$("details");b.append(el("p","Based in "+d.business.city));if(d.business.email){const a=el("a",d.business.email);a.href="mailto:"+d.business.email;b.append(a);}if(d.business.phone){const a=el("a",d.business.phone);a.href="tel:"+d.business.phone;b.append(el("br"),a);}if(!d.business.email&&!d.business.phone)b.append(el("p","Contact details coming soon.","notice"));}
if($("faq"))for(const f of d.faq){const n=el("details");n.append(el("summary",f.q),el("p",f.a));$("faq").append(n);}
if($("reviews")){if(!d.reviews.length)empty($("reviews"),"Customer reviews coming soon.");for(const v of d.reviews){const a=el("article",null,"notice");a.append(el("p","★".repeat(Math.max(0,Math.min(5,Math.floor(v.rating||0))))),el("p",v.text),el("strong",v.name+" · "+v.source));$("reviews").append(a);}if(d.business.reviewUrl)link($("reviews"),"Read or leave a review",d.business.reviewUrl);}
function gallery(v){const b=$("gallery");if(!b)return;b.replaceChildren();const photos=d.gallery.filter(p=>v==="All"||p.category===v);if(!photos.length)return empty(b,"Gallery coming soon.");for(const p of photos){const n=el("button",null,"gallery-btn");n.type="button";n.append(img(p.src,p.alt),el("span",p.caption));n.onclick=()=>{$("large-photo").src=r+p.src;$("large-photo").alt=p.alt;$("photo-caption").textContent=p.caption;$("lightbox").showModal();};b.append(n);}}
if($("gallery")){gallery("All");filters("gallery-filters",d.gallery.map(p=>p.category),gallery);$("close").onclick=()=>$("lightbox").close();}




/* FIVE STAR WORLD — GPU-rendered concession arcade, inertial menu and iris navigation. */
(()=>{
 const reduced=matchMedia("(prefers-reduced-motion: reduce)");
 const stage=document.querySelector(".hero,.intro");
 if(stage){
  stage.classList.add("world-stage");
  if(stage.classList.contains("hero"))stage.firstElementChild.classList.add("world-copy");
  const canvas=el("canvas",null,"world-canvas");canvas.setAttribute("aria-hidden","true");stage.prepend(canvas);
  const hint=el("div","Move to explore","world-hint");stage.append(hint);
  const gl=canvas.getContext("webgl",{alpha:false,antialias:false,powerPreference:"low-power"});
  let render=()=>{},dragOffset=0;
  if(gl){
   const vertex="attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
   const fragment=`precision mediump float;
uniform vec2 res,mouse;uniform float tm,travel;
float scene(vec3 p){
 float z=mod(p.z+2.5,5.)-2.5;
 float ring=p.y>2.15?abs(length(vec2(p.x,p.y-2.15))-2.25):abs(abs(p.x)-2.25);
 float arch=max(ring-.17,abs(z)-.26);
 return min(p.y,arch);
}
void main(){
 vec2 uv=(gl_FragCoord.xy*2.-res)/res.y;
 vec3 ro=vec3(mouse.x*.72,1.55+mouse.y*.18,-2.2+travel);
 vec3 rd=normalize(vec3(uv.x*.75+mouse.x*.16,uv.y*.75-.07+mouse.y*.09,1.));
 float t=.05;float h=0.;bool hit=false;
 for(int i=0;i<72;i++){h=scene(ro+rd*t);if(h<.009){hit=true;break;}t+=max(.012,h*.84);if(t>38.)break;}
 vec3 p=ro+rd*t;
 float sky=.16+.12*max(0.,rd.y)+.18*exp(-3.*abs(uv.x));
 vec3 col=vec3(sky);
 if(hit){
  if(p.y<.025){
   float tile=mod(floor(p.x)+floor(p.z),2.);
   float edge=min(min(fract(p.x),1.-fract(p.x)),min(fract(p.z),1.-fract(p.z)));
   float aa=min(.49,.015+t*.004);
   tile=mix(.5,tile,smoothstep(0.,aa,edge));
   col=vec3(mix(.075,.83,tile));
   col*=.8+.2*cos(p.z*1.256);
  }else{
   vec2 e=vec2(.018,0.);
   vec3 n=normalize(vec3(scene(p+e.xyy)-scene(p-e.xyy),scene(p+e.yxy)-scene(p-e.yxy),scene(p+e.yyx)-scene(p-e.yyx)));
   float light=.35+.65*max(0.,dot(n,normalize(vec3(-.5,.8,-.6))));
   col=vec3(.77*light);
  }
  col=mix(col,vec3(.24),1.-exp(-t*.047));
 }
 float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*4375.8545);
 col+=.028*(grain-.5);
 col*=1.-.18*clamp(dot(uv,uv)*.35,0.,1.);
 gl_FragColor=vec4(col,1.);
}`;
   const compile=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){console.warn(gl.getShaderInfoLog(s));return null;}return s;};
   const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment);
   if(vs&&fs){
    const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
    if(gl.getProgramParameter(program,gl.LINK_STATUS)){
     gl.useProgram(program);const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);const a=gl.getAttribLocation(program,"a");gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
     const ur=gl.getUniformLocation(program,"res"),um=gl.getUniformLocation(program,"mouse"),ut=gl.getUniformLocation(program,"travel");
     let tx=0,ty=0,x=0,y=0,z=0,visible=true,raf=0;
     function draw(){raf=0;if(!visible||document.hidden)return;const rect=stage.getBoundingClientRect();const scale=Math.min(1,900/Math.max(1,rect.width),600/Math.max(1,rect.height));const w=Math.max(1,Math.round(rect.width*scale)),h=Math.max(1,Math.round(rect.height*scale));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}x+=(tx-x)*.09;y+=(ty-y)*.09;z+=(dragOffset-z)*.075;gl.uniform2f(ur,w,h);gl.uniform2f(um,x,y);gl.uniform1f(ut,z);gl.drawArrays(gl.TRIANGLES,0,3);if(!reduced.matches&&(Math.abs(tx-x)+Math.abs(ty-y)+Math.abs(dragOffset-z)>.004))schedule();}
     function schedule(){if(!raf)raf=requestAnimationFrame(draw);}
     render=schedule;
     stage.addEventListener("pointermove",e=>{if(reduced.matches||e.pointerType==="touch")return;const q=stage.getBoundingClientRect();tx=(e.clientX-q.left)/q.width*2-1;ty=1-(e.clientY-q.top)/q.height*2;schedule();},{passive:true});
     stage.addEventListener("pointerleave",()=>{tx=ty=0;schedule();});
     if("IntersectionObserver" in window)new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)schedule();}).observe(stage);
     if("ResizeObserver" in window)new ResizeObserver(schedule).observe(stage);else addEventListener("resize",schedule);
     document.addEventListener("visibilitychange",schedule);schedule();
    }
   }
  }
  // Original line-art cards until actual food photographs are supplied.
  if(document.getElementById("menu-items")&&d.menu.length){
   stage.classList.add("menu-world");hint.remove();
   const deck=el("div",null,"deck");deck.tabIndex=0;deck.setAttribute("role","region");deck.setAttribute("aria-label","Interactive food showcase. Drag or use left and right arrow keys.");
   const items=d.menu.filter(m=>m.available),cards=[];
   const ns="http://www.w3.org/2000/svg";
   function art(m){
    if(m.image)return img(m.image,m.name);
    const svg=document.createElementNS(ns,"svg");svg.setAttribute("viewBox","0 0 140 120");svg.setAttribute("aria-hidden","true");
    const shape=(tag,attrs)=>{const n=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));svg.append(n);};
    const stroke={fill:"none",stroke:"#111","stroke-width":"4","stroke-linecap":"round","stroke-linejoin":"round"};
    if(m.category==="Funnel Cakes"){shape("ellipse",{cx:70,cy:64,rx:59,ry:48,...stroke});for(let i=0;i<8;i++){let path="";for(let j=0;j<=90;j++){const t=j/90*Math.PI*2;const a=t+i*.69;const rad=37+11*Math.sin(t*5+i);path+=(j?"L":"M")+(70+Math.cos(a)*rad).toFixed(1)+" "+(63+Math.sin(a)*rad*.78).toFixed(1);}shape("path",{d:path,...stroke,"stroke-width":2.2});}}
    else if(m.category==="Drinks"){shape("path",{d:"M40 34 L48 108 H92 L100 34 Z M35 34 H105 M73 34 L87 8 H104",...stroke});shape("path",{d:"M46 63 Q70 53 94 63",...stroke});}
    else if(m.id==="corn-dog"){shape("rect",{x:49,y:10,width:42,height:80,rx:21,...stroke});shape("path",{d:"M70 90V116",...stroke});}
    else if(m.id==="oreos"){for(const [cx,cy] of [[48,47],[91,48],[70,85]]){shape("circle",{cx,cy,r:25,...stroke});shape("circle",{cx,cy,r:17,...stroke,"stroke-width":2});}}
    else{shape("path",{d:"M29 57 L44 110 H96 L111 57 Z",...stroke});for(let i=0;i<4;i++)shape("path",{d:"M"+(42+i*18)+" 59 q-20 -13 0 -23 t0 -23",...stroke});}
    return svg;
   }
   for(const [i,m] of items.entries()){
    const card=el("div",null,"deck-card");card.setAttribute("aria-hidden","true");const visual=el("div",null,"art");visual.append(art(m));card.append(el("small",String(i+1).padStart(2,"0")+" / "+m.category),visual,el("strong",m.name));deck.append(card);cards.push(card);
   }
   const controls=el("div",null,"deck-controls"),prev=el("button","←"),next=el("button","→"),count=el("span",null,"deck-count"),caption=el("p",null,"deck-caption");prev.type=next.type="button";prev.setAttribute("aria-label","Previous menu item");next.setAttribute("aria-label","Next menu item");caption.setAttribute("aria-live","polite");controls.append(prev,count,next);stage.append(deck,controls,caption);
   let current=0,target=0,raf=0,held=false,startX=0,startTarget=0,last=0;
   const wrap=(n,m)=>((n%m)+m)%m;
   function paint(){raf=0;current=reduced.matches?target:current+(target-current)*.13;const n=cards.length;for(let i=0;i<n;i++){const k=wrap(i-current+n/2,n)-n/2,abs=Math.abs(k),spacing=Math.min(290,deck.clientWidth*.43);cards[i].style.transform="translate(-50%,-50%) translate3d("+(k*spacing)+"px,"+(abs*16)+"px,"+(-abs*120)+"px) rotateY("+(-k*25)+"deg)";cards[i].style.opacity=String(Math.max(0,1-abs*.26));cards[i].style.zIndex=String(100-Math.round(abs*10));}dragOffset=current*.48;render();if(Math.abs(target-current)>.002)raf=requestAnimationFrame(paint);}
   function go(n){target=n;const i=wrap(Math.round(n),items.length);count.textContent=String(i+1).padStart(2,"0")+" / "+String(items.length).padStart(2,"0");caption.textContent=items[i].name+" — "+items[i].description;if(!raf)raf=requestAnimationFrame(paint);}
   prev.onclick=()=>go(Math.round(target)-1);next.onclick=()=>go(Math.round(target)+1);
   deck.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();go(Math.round(target)+(e.key==="ArrowRight"?1:-1));}});
   deck.addEventListener("pointerdown",e=>{if(e.button!==0)return;held=true;startX=e.clientX;startTarget=target;deck.setPointerCapture(e.pointerId);deck.classList.add("dragging");});
   deck.addEventListener("pointermove",e=>{if(held)go(startTarget+(startX-e.clientX)/Math.max(100,deck.clientWidth*.24));});
   const release=()=>{if(!held)return;held=false;deck.classList.remove("dragging");go(Math.round(target));};deck.addEventListener("pointerup",release);deck.addEventListener("pointercancel",release);deck.addEventListener("lostpointercapture",release);
   deck.addEventListener("wheel",e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.preventDefault();if(performance.now()-last>180){last=performance.now();go(Math.round(target)+Math.sign(e.deltaX));}}},{passive:false});
   addEventListener("resize",()=>{if(!raf)raf=requestAnimationFrame(paint);});go(0);
  }
  if(matchMedia("(pointer:fine)").matches&&!reduced.matches){const cursor=el("div",null,"world-cursor");cursor.setAttribute("aria-hidden","true");document.body.append(cursor);stage.addEventListener("pointermove",e=>{cursor.classList.add("on");cursor.style.transform="translate("+(e.clientX-19)+"px,"+(e.clientY-19)+"px)";});stage.addEventListener("pointerleave",()=>cursor.classList.remove("on"));}
 }
 const wipe=el("div",null,"world-wipe");wipe.setAttribute("aria-hidden","true");wipe.append(el("span","★★★★★"));document.body.append(wipe);
 const key="five-star-world-wipe";let entering=false,leaving=false;
 try{entering=sessionStorage.getItem(key)==="1";sessionStorage.removeItem(key);}catch{}
 if(entering&&!reduced.matches){wipe.style.transition="none";wipe.classList.add("cover");requestAnimationFrame(()=>requestAnimationFrame(()=>{wipe.style.transition="";wipe.classList.remove("cover");}));}
 document.addEventListener("click",e=>{if(reduced.matches||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const a=e.target.closest?.("a[href]");if(!a||a.hasAttribute("download")||(a.target&&a.target!=="_self"))return;const u=new URL(a.href,location.href);if(!["http:","https:"].includes(u.protocol)||u.origin!==location.origin||u.pathname===location.pathname&&u.search===location.search)return;e.preventDefault();if(leaving)return;leaving=true;wipe.style.setProperty("--wx",(e.detail?e.clientX:innerWidth/2)+"px");wipe.style.setProperty("--wy",(e.detail?e.clientY:innerHeight/2)+"px");wipe.classList.add("cover");try{sessionStorage.setItem(key,"1");}catch{}setTimeout(()=>location.assign(u.href),660);});
 addEventListener("pageshow",e=>{if(e.persisted){leaving=false;wipe.classList.remove("cover");try{sessionStorage.removeItem(key);}catch{}}});
})();

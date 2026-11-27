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
document.querySelectorAll("[data-photo]").forEach(n => {
    const path = d.photos[n.dataset.photo];
    if (!path) return;
    const picture = img(path, "Idaho Five Star Funnel Cake " + n.dataset.photo + " photograph");
    picture.addEventListener("load", () => n.replaceChildren(picture), { once: true });
    if (picture.complete && picture.naturalWidth > 0) n.replaceChildren(picture);
});
for(const [name,url] of [["Facebook",d.business.facebook],["Instagram",d.business.instagram]])if(url)link($("social"),name,url);
function filters(id,values,render){const b=$(id);if(!b)return;for(const v of ["All",...new Set(values)]){const n=el("button",v);n.type="button";n.setAttribute("aria-pressed",String(v==="All"));n.onclick=()=>{b.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",String(x===n)));render(v);};b.append(n);}}
function menu(id,items){
 const box=$(id);if(!box)return;box.replaceChildren();if(!items.length)return empty(box,"Menu details coming soon.");
 for(const m of items){
  const a=el("article",null,"item");
  if(m.options?.length){
   a.classList.add("drinks-item");const details=el("details"),summary=el("summary"),heading=el("span",m.name,"drinks-title");summary.append(heading,el("span",m.price==null?"Varies by event":money(m.price),"price"));const list=el("ul");for(const option of m.options)list.append(el("li",option));details.append(summary,el("p",m.description),list);a.append(details);box.append(a);continue;
  }
  const p=el("div",null,"photo");const placeholder=()=>p.replaceChildren(el("span","✦"),el("small","Photo coming soon"));
  if(m.image){const picture=img(m.image,m.name);picture.addEventListener("error",placeholder,{once:true});p.append(picture);}else placeholder();
  const h=el("div",null,"between");h.append(el("h3",m.name),el("span",m.price==null?"Varies by event":money(m.price),"price"));a.append(p);if(m.illustrative)a.append(el("small","Illustrative image","image-note"));a.append(h,el("p",m.description));if(m.toppings?.length)a.append(el("p","Toppings: "+m.toppings.join(", ")));if(m.tags?.length)a.append(el("p",m.tags.join(" · ")));if(!m.available)a.append(el("p","Currently unavailable","notice"));box.append(a);
 }
}
menu("featured",d.menu.filter(m=>m.featured).slice(0,3));menu("menu-items",d.menu);filters("menu-filters",d.menu.map(m=>m.category),v=>menu("menu-items",d.menu.filter(m=>v==="All"||m.category===v)));
const today=c.dateKey(new Date(),d.business.timezone),events=c.upcoming(d.events,today);
function eventList(id,items){const b=$(id);if(!b)return;b.replaceChildren();if(!items.length)return empty(b,"No events announced. Check back for updates.");for(const e of items){const a=el("article",null,"event"),info=el("div"),links=el("div");info.append(el("h3",e.name),el("p",[e.address,e.hours].filter(Boolean).join(" · ")));if(e.description)info.append(el("p",e.description));if(e.status==="cancelled")info.append(el("strong","Cancelled"));if(e.address)link(links,"Directions ↗",c.maps(e.address));if(e.url)link(links,"Event website ↗",e.url);a.append(el("strong",fmt(e.start)+(e.end&&e.end!==e.start?" – "+fmt(e.end):"")),info,links);b.append(a);}}
eventList("home-events",events.slice(0,3));eventList("events",events);eventList("past",d.events.filter(e=>e.status==="confirmed"&&(e.end||e.start)<today).sort((a,b)=>b.start.localeCompare(a.start)));
if($("month")){const months=new Set();for(const e of events){let dt=new Date(e.start.slice(0,7)+"-01T00:00:00Z");const end=(e.end||e.start).slice(0,7);for(let i=0;i<120&&dt.toISOString().slice(0,7)<=end;i++){months.add(dt.toISOString().slice(0,7));dt.setUTCMonth(dt.getUTCMonth()+1);}}for(const m of [...months].sort()){const o=el("option",new Intl.DateTimeFormat("en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(m+"-01T12:00:00Z")));o.value=m;$("month").append(o);}$("month").onchange=()=>{const m=$("month").value;eventList("events",events.filter(e=>!m||(e.start.slice(0,7)<=m&&(e.end||e.start).slice(0,7)>=m)));};}
if($("weekly"))for(const [day,s] of Object.entries(d.weekly)){const tr=el("tr"),th=el("th",day),td=el("td");th.scope="row";if(s?.address)link(td,"Open map ↗",c.maps(s.address));else td.textContent="—";tr.append(th,el("td",s?[s.location,s.address].filter(Boolean).join(" · "):"Not announced"),el("td",s?.hours||"—"),td);$("weekly").append(tr);}
for(const id of ["packages","book-packages"])if($(id))for(const p of d.catering.packages){const o=el("option",p.name+(id==="packages"?" — "+money(p.perGuest)+"/guest":""));o.value=p.id;$(id).append(o);}
if($("quote")){const f=$("quote");if(d.catering.approved)$("rate-note").textContent="Estimate only; final rates require confirmation.";for(const a of d.catering.addons){const l=el("label",null,"check"),i=el("input");i.type="checkbox";i.name="addon";i.value=a.id;l.append(i,document.createTextNode(a.name+" — "+money(a.perGuest||0)+"/guest"+(a.flat?" + "+money(a.flat):"")));$("addons").append(l);}function update(){const fd=new FormData(f),n=c.estimate(d.catering,Number(fd.get("guests")),fd.get("package"),Number(fd.get("hours")),fd.getAll("addon"));$("breakdown").replaceChildren();$("quote-book").href="../contact/";if(!n||!f.checkValidity()){$("total").textContent="—";return;}$("total").textContent=money(n.total);for(const [k,v] of [["Package (min. "+money(d.catering.minimum)+")",n.base],["Extra hours",n.extra],["Add-ons",n.addons]]){const line=el("div",null,"line");line.append(el("span",k),el("strong",money(v)));$("breakdown").append(line);}const params=new URLSearchParams({guests:fd.get("guests"),package:fd.get("package"),type:fd.get("type"),notes:(d.catering.approved?"Estimate":"Demo estimate")+": "+money(n.total)+"; extra hours: "+fd.get("hours")+"; add-ons: "+fd.getAll("addon").join(", ")});$("quote-book").href="../contact/?"+params; }f.addEventListener("input",update);f.addEventListener("change",update);f.addEventListener("submit",e=>e.preventDefault());update();}
if($("details")){const b=$("details");b.append(el("p","Based in "+d.business.city));if(d.business.email){const a=el("a",d.business.email);a.href="mailto:"+d.business.email;b.append(a);}if(d.business.phone){const a=el("a",d.business.phone);a.href="tel:"+d.business.phone;b.append(el("br"),a);}if(!d.business.email&&!d.business.phone)b.append(el("p","Contact details coming soon.","notice"));}
if($("faq"))for(const f of d.faq){const n=el("details");n.append(el("summary",f.q),el("p",f.a));$("faq").append(n);}
if($("reviews")){if(!d.reviews.length)empty($("reviews"),"Customer reviews coming soon.");for(const v of d.reviews){const a=el("article",null,"notice");a.append(el("p","★".repeat(Math.max(0,Math.min(5,Math.floor(v.rating||0))))),el("p",v.text),el("strong",v.name+" · "+v.source));$("reviews").append(a);}if(d.business.reviewUrl)link($("reviews"),"Read or leave a review",d.business.reviewUrl);}
function gallery(v){const b=$("gallery");if(!b)return;b.replaceChildren();const photos=d.gallery.filter(p=>v==="All"||p.category===v);if(!photos.length)return empty(b,"Gallery coming soon.");for(const p of photos){const n=el("button",null,"gallery-btn");n.type="button";n.append(img(p.src,p.alt),el("span",p.caption));n.onclick=()=>{$("large-photo").src=r+p.src;$("large-photo").alt=p.alt;$("photo-caption").textContent=p.caption;$("lightbox").showModal();};b.append(n);}}
if($("gallery")){gallery("All");filters("gallery-filters",d.gallery.map(p=>p.category),gallery);$("close").onclick=()=>$("lightbox").close();}

/* Display the supplied business logo when its image asset is installed. */
if(d.business.logo){
    document.querySelectorAll(".brand").forEach(brand => {
        const picture = img(d.business.logo, d.business.name);
        picture.className = "brand-logo";
        picture.loading = "eager";
        picture.width = 132;
        picture.height = 74;

        const showLogo = () => brand.replaceChildren(picture);
        picture.addEventListener("load", showLogo, { once: true });
        if (picture.complete && picture.naturalWidth > 0) showLogo();
    });
 const hero=document.querySelector('[data-photo="hero"]');
 if(hero&&!d.photos.hero){const picture=img(d.business.logo,d.business.name);picture.loading="eager";picture.addEventListener("load",()=>{hero.classList.add("logo-hero");hero.replaceChildren(picture);},{once:true});}
}

/* Potential events are separate from confirmed appearances and location banners. */
const targetEventsBox = $("potential-events-list");

if (targetEventsBox && Array.isArray(d.targetEvents)) {
    const targets = d.targetEvents
        .filter(event => !d.events.some(confirmed => confirmed.status === "confirmed" &&
            confirmed.name === event.name &&
            confirmed.start.slice(0, 4) === String(event.year)))
        .sort((a, b) => a.priority - b.priority);

    targetEventsBox.replaceChildren();

    for (const event of targets) {
        const article = el("article", null, "event");
        const info = el("div");

        info.append(
            el("h3", event.name),
            el("p", event.location)
        );

        article.append(
            el("strong", String(event.year)),
            info,
            el("span", "Not confirmed")
        );

        targetEventsBox.append(article);
    }

    if (!targets.length) {
        empty(targetEventsBox, "Check our confirmed schedule for updates.");
    }
}

// Shared date and quote helpers; also usable in Node tests.
(function(root,factory){const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;else root.SiteCore=api;})(globalThis,function(){
function dateKey(date=new Date(),zone="America/Boise"){const p=new Intl.DateTimeFormat("en-US",{timeZone:zone,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(date);const get=t=>p.find(x=>x.type===t).value;return get("year")+"-"+get("month")+"-"+get("day");}
function weekday(date=new Date(),zone="America/Boise"){return new Intl.DateTimeFormat("en-US",{timeZone:zone,weekday:"long"}).format(date);}
function upcoming(events,today){return events.filter(e=>["confirmed","cancelled"].includes(e.status)&&(e.end||e.start)>=today).sort((a,b)=>a.start.localeCompare(b.start));}
function active(events,today){return upcoming(events,today).filter(e=>e.status==="confirmed"&&e.start<=today);}
function estimate(config,guests,id,hours,ids=[]){const p=config.packages.find(x=>x.id===id);if(!p||!Number.isInteger(guests)||guests<1||guests>10000||!Number.isInteger(hours)||hours<0||hours>24)return null;const base=Math.max(config.minimum,guests*p.perGuest),extra=hours*config.extraHour,addons=config.addons.filter(x=>ids.includes(x.id)).reduce((n,x)=>n+(x.perGuest||0)*guests+(x.flat||0),0);return {base,extra,addons,total:base+extra+addons};}
function maps(address){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(address);}
return {dateKey,weekday,upcoming,active,estimate,maps};
});
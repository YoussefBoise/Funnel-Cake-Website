const test=require("node:test"),assert=require("node:assert/strict"),c=require("../assets/core.js");
const config={minimum:350,extraHour:150,packages:[{id:"classic",perGuest:7}],addons:[{id:"dessert",perGuest:3,flat:0}]};
test("minimum booking",()=>assert.deepEqual(c.estimate(config,10,"classic",0),{base:350,extra:0,addons:0,total:350}));
test("extra hours and add-ons",()=>assert.equal(c.estimate(config,100,"classic",2,["dessert"]).total,1300));
test("invalid input",()=>{for(const g of [0,-1,2.5,10001,NaN])assert.equal(c.estimate(config,g,"classic",0),null);assert.equal(c.estimate(config,100,"missing",0),null);});
test("Boise date and weekday",()=>{const dt=new Date("2027-01-01T02:00:00Z");assert.equal(c.dateKey(dt),"2026-12-31");assert.equal(c.weekday(dt),"Thursday");});
test("event filtering",()=>{const events=[{name:"past",start:"2026-01-01",status:"confirmed"},{name:"pending",start:"2027-01-02",status:"pending"},{name:"now",start:"2026-12-31",end:"2027-01-03",status:"confirmed"},{name:"cancel",start:"2027-01-04",status:"cancelled"}];assert.deepEqual(c.upcoming(events,"2027-01-01").map(e=>e.name),["now","cancel"]);assert.deepEqual(c.active(events,"2027-01-01").map(e=>e.name),["now"]);});
test("map encoding",()=>assert.equal(c.maps("Main & 1st"),"https://www.google.com/maps/search/?api=1&query=Main%20%26%201st"));

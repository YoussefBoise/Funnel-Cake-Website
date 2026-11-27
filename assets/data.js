// EDIT THIS FILE to change the menu, schedule, pricing, photos and business details.
// Never put secrets here; the entire website is public.
window.SITE_DATA = {
 business:{logo:"assets/images/logo (1).png",name:"Idaho Five Star Funnel Cake LLC",city:"Boise, Idaho",timezone:"America/Boise",email:"idahofunnelcake@gmail.com",phone:"208-971-0000",facebook:"",instagram:"https://www.instagram.com/idahofunnelcake/",reviewUrl:""},
 photos: {
    hero: "",
    trailer: "assets/images/trailer-service.webp",
    catering: "assets/images/trailer-service.webp",
    about: "assets/images/trailer-side.webp"
 },
 // Prices vary by event; null means no fixed published price.
 menu:[
  {
    "id": "classic",
    "name": "Classic Funnel Cake",
    "category": "Funnel Cakes",
    "description": "Funnel cake topped with powdered sugar.",
    "price": null,
    "image": "assets/images/classic (1).webp",
    "tags": [],
    "toppings": [],
    "featured": true,
    "available": true,
    "illustrative": true
  },
  {
    "id": "works",
    "name": "Funnel Cake Works",
    "category": "Funnel Cakes",
    "description": "Funnel cake with strawberry, chocolate, caramel, whipped cream, powdered sugar and cinnamon.",
    "price": null,
    "image": "assets/images/works (1).webp",
    "tags": [],
    "toppings": [],
    "featured": true,
    "available": true,
    "illustrative": true
  },
  {
    "id": "oreos",
    "name": "Deep-Fried Oreos",
    "category": "Desserts",
    "description": "Deep-fried Oreo cookies.",
    "price": null,
    "image": "assets/images/oreos (1).webp",
    "tags": [],
    "toppings": [],
    "featured": true,
    "available": true,
    "illustrative": true
  },
  {
    "id": "corn-dog",
    "name": "Corn Dog",
    "category": "Savory",
    "description": "Battered and fried corn dog.",
    "price": null,
    "image": "assets/images/corn-dog (1).webp",
    "tags": [],
    "toppings": [],
    "featured": false,
    "available": true,
    "illustrative": true
  },
  {
    "id": "chicken",
    "name": "Chicken Strips & Hand-Cut Curly Fries",
    "category": "Savory",
    "description": "Chicken strips served with hand-cut curly fries.",
    "price": null,
    "image": "assets/images/chicken (1).webp",
    "tags": [],
    "toppings": [],
    "featured": false,
    "available": true,
    "illustrative": true
  },
  {
    "id": "fries",
    "name": "Hand-Cut Curly Fries",
    "category": "Savory",
    "description": "Hand-cut curly fries.",
    "price": null,
    "image": "assets/images/fries (1).webp",
    "tags": [],
    "toppings": [],
    "featured": false,
    "available": true,
    "illustrative": true
  },
  {
    "id": "drinks",
    "name": "Drinks",
    "category": "Drinks",
    "description": "Choose from our refreshing beverages.",
    "price": null,
    "image": "",
    "options": [
      "Soda",
      "Water",
      "Lemonade",
      "Iced Tea"
    ],
    "tags": [],
    "toppings": [],
    "featured": false,
    "available": true
  }
],
    // Potential events only. Do not add to the confirmed schedule until booked.
    targetEvents: [
        {
            "priority": 1,
            "name": "Western Idaho Fair",
            "location": "Garden City, Idaho",
            "year": 2027,
            "status": "unconfirmed"
        },
        {
            "priority": 2,
            "name": "Eastern Idaho State Fair",
            "location": "Blackfoot, Idaho",
            "year": 2027,
            "status": "unconfirmed"
        },
        {
            "priority": 3,
            "name": "Canyon County Fair",
            "location": "Caldwell, Idaho",
            "year": 2027,
            "status": "unconfirmed"
        },
        {
            "priority": 4,
            "name": "Emmett Cherry Festival",
            "location": "Emmett, Idaho",
            "year": 2027,
            "status": "unconfirmed"
        },
        {
            "priority": 5,
            "name": "Boise Music Festival",
            "location": "Garden City, Idaho",
            "year": 2027,
            "status": "unconfirmed"
        },
        {
            "priority": 6,
            "name": "Snake River Stampede",
            "location": "Nampa, Idaho",
            "year": 2027,
            "status": "unconfirmed"
        },
        {
            "priority": 7,
            "name": "Meridian Dairy Days",
            "location": "Meridian, Idaho",
            "year": 2027,
            "status": "unconfirmed"
        },
        {
            "priority": 8,
            "name": "Spirit of Boise Balloon Classic",
            "location": "Boise, Idaho",
            "year": 2027,
            "status": "unconfirmed"
        },
        {
            "priority": 9,
            "name": "Art in the Park",
            "location": "Boise, Idaho",
            "year": 2027,
            "status": "unconfirmed"
        },
        {
            "priority": 10,
            "name": "Hyde Park Street Fair",
            "location": "Boise, Idaho",
            "year": 2027,
            "status": "unconfirmed"
        },
        {
            "priority": 11,
            "name": "Kuna Days",
            "location": "Kuna, Idaho",
            "year": 2027,
            "status": "unconfirmed"
        },
        {
            "priority": 12,
            "name": "Eagle Fun Days",
            "location": "Eagle, Idaho",
            "year": 2027,
            "status": "unconfirmed"
        }
    ],
 // Add only public, confirmed events. Dates YYYY-MM-DD.
 events:[
   // {name:"Event",start:"2027-06-01",end:"2027-06-02",hours:"11 AM – 8 PM",address:"Street, City, ID",description:"",url:"https://example.com",status:"confirmed"}
   // status can also be "cancelled" for announcements.
 ],
 weekly:{Monday:null,Tuesday:null,Wednesday:null,Thursday:null,Friday:null,Saturday:null,Sunday:null}, // Replace null with {location:"Venue",address:"Street, Boise, ID",hours:"12 PM – 4 PM"}
 // DEMO prices only: set approved to true after replacing with your actual rates.
 catering:{approved:false,minimum:350,extraHour:150,packages:[{id:"classic",name:"Classic",perGuest:7},{id:"deluxe",name:"Deluxe",perGuest:10},{id:"premium",name:"Premium",perGuest:13}],addons:[{id:"dessert",name:"Additional dessert service",perGuest:3,flat:0}]},
 gallery: [
    {
        src: "assets/images/trailer-service.webp",
        alt: "Food trailer service window side",
        caption: "Our trailer — service windows",
        category: "Trailer"
    },
    {
        src: "assets/images/trailer-side.webp",
        alt: "Food trailer opposite side",
        caption: "Our trailer — opposite side",
        category: "Trailer"
    }
 ],
 reviews:[
   // {name:"Display name",rating:5,text:"Approved testimonial",source:"Verified source"}
 ],
 faq:[{q:"Where can I find the trailer?",a:"Visit Events & Locations for confirmed public stops."},{q:"Can I book a private event?",a:"Text 208-971-0000 or email idahofunnelcake@gmail.com to discuss your event. Online booking is not available. All dates require confirmation."},{q:"How much does catering cost?",a:"Cost depends on guest count, service duration and menu. Request a personalized quote."},{q:"What about food allergies?",a:"Please ask us about ingredients and shared equipment before ordering."},{q:"What if an event is cancelled?",a:"Check our public event schedule for announcements and contact us regarding private events."}]
};
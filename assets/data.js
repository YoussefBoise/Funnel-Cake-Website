// EDIT THIS FILE to change the menu, schedule, pricing, photos and business details.
// Never put secrets here; the entire website is public.
window.SITE_DATA = {
 business:{logo:"assets/images/logo (1).png",name:"Idaho Five Star Funnel Cake LLC",city:"Boise, Idaho",timezone:"America/Boise",email:"idahofunnelcake@gmail.com",phone:"208-971-0000",facebook:"",instagram:"https://www.instagram.com/idahofunnelcake/",reviewUrl:"",formEndpoint:""}, // Add a real HTTPS form service endpoint to send inquiries.
 photos:{hero:"",trailer:"",catering:"",about:""}, // Example: "assets/images/trailer.jpg"
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
 // Add only public, confirmed events. Dates YYYY-MM-DD.
 events:[
   // {name:"Event",start:"2027-06-01",end:"2027-06-02",hours:"11 AM – 8 PM",address:"Street, City, ID",description:"",url:"https://example.com",status:"confirmed"}
   // status can also be "cancelled" for announcements.
 ],
 weekly:{Monday:null,Tuesday:null,Wednesday:null,Thursday:null,Friday:null,Saturday:null,Sunday:null}, // Replace null with {location:"Venue",address:"Street, Boise, ID",hours:"12 PM – 4 PM"}
 // DEMO prices only: set approved to true after replacing with your actual rates.
 catering:{approved:false,minimum:350,extraHour:150,packages:[{id:"classic",name:"Classic",perGuest:7},{id:"deluxe",name:"Deluxe",perGuest:10},{id:"premium",name:"Premium",perGuest:13}],addons:[{id:"dessert",name:"Additional dessert service",perGuest:3,flat:0}]},
 gallery:[
   // {src:"assets/images/photo.jpg",alt:"Description of photo",caption:"Event name",category:"Events"}
 ],
 reviews:[
   // {name:"Display name",rating:5,text:"Approved testimonial",source:"Verified source"}
 ],
 faq:[{q:"Where can I find the trailer?",a:"Visit Events & Locations for confirmed public stops."},{q:"Can I book a private event?",a:"Submit an inquiry on the Book Us page. All dates require confirmation."},{q:"How much does catering cost?",a:"Cost depends on guest count, service duration and menu. Request a personalized quote."},{q:"What about food allergies?",a:"Please ask us about ingredients and shared equipment before ordering."},{q:"What if an event is cancelled?",a:"Check our public event schedule for announcements and contact us regarding private events."}]
};
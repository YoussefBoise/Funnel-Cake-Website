# Idaho Five Star Funnel Cake LLC
Public-facing multi-page food trailer website. Black-and-white checkerboard theme. No application backend or database.

## Preview locally
In Git Bash: `bash start.sh` then open http://localhost:8000. Optional port: `bash start.sh 8081`.

## Edit
- assets/data.js: business contacts, menu, prices, confirmed events, weekly stops, packages, photo paths, reviews and FAQs.
- assets/styles.css: design, checkerboard pattern, typography, responsive layout.
- index.html and page directories: page content, navigation, branding. The temporary text logo is repeated in page headers.
- assets/images/: add actual business photos.

Menu, Events, Catering, Book Us, Gallery, About, Contact/FAQ and draft Privacy/Terms pages are included. Contact and booking inquiries are handled directly by phone, email or Instagram. The website has no message submission forms. Confirmed event locations, approved prices and verified testimonials should be added when available.

## Testing
Optional Node 18+ tests: `node --test tests/core.test.js`. Check all pages on desktop and mobile, verify menu filtering, dates, maps, gallery and direct contact links before launch.

## Production (after review)
Run deploy/setup-ec2.sh on the dedicated Ubuntu EC2 instance (it replaces the default Nginx site). Then locally run `bash deploy/deploy.sh /path/to/key.pem ubuntu@YOUR_EC2_IP`. Set up a domain, HTTPS, final legal text and business details before publication. Never commit private keys. Deployment does not remove stale files. 

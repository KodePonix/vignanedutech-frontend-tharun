# OPOT-SOLVANCE Public Website Frontend

React + Vite responsive public website starter in the agreed royal navy, gold and white theme.

## Run locally
1. Install Node.js 18+.
2. Extract the ZIP and open this folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to the Node.js + TypeORM backend API.
5. Run `npm run dev`.
6. Open `http://localhost:5174`.

## Build
- `npm run build`
- `npm run preview`

## Included public sections
1. Hero
2. About Us
3. Our Programs
4. Why Choose Us / Our Edge
5. Student Impact
6. Our Services
7. Grade-wise Classes
8. Curriculum
9. Student Showcase with category filters
10. Testimonials carousel
11. Collaborate With Us
12. Contact form
13. Footer

## Important
- This is a frontend starter with sample content and placeholder contact details. Replace company email, phone, location, social URLs, images and testimonials with approved real company content before launch.
- Images currently use remote Unsplash URLs; for production, replace with company-approved assets and/or Cloudinary URLs.
- Contact form currently demonstrates client-side success only. It does not submit to the database until connected to the backend API.
- Content is currently held in the React source. To meet the requirement that every visible content item be editable from `/admin`, connect sections, text, images, cards, curriculum, testimonials, theme and footer to backend APIs. Do not treat these sample values as final CMS data.
- The sample testimonials are placeholder examples, not verified customer testimonials.
- The curriculum request button links to the contact form because no approved PDF was provided yet.

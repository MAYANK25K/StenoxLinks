# 🔗 StenoxLinks: A Production-Ready URL Shortener

Hey there! 👋 Welcome to **StenoxLinks**. 

I built this project because I wanted to move past basic "hello world" tutorials and engineer a full-stack application that actually handles real-world, production-level edge cases. It's a custom URL shortener built on the Next.js 15 App Router and MongoDB, but more importantly, it's designed with the architecture of a scalable SaaS product in mind.

**[🔴 Check out the Live App Here]** *([Insert your Vercel Link](https://stenox-links.vercel.app/))*

---

## 💡 Why I Built This

I didn't just want a script that makes links smaller. I wanted to understand how platforms like Bitly handle rapid database read/writes, deal with serverless connection pooling, and manage dynamic routing without slowing down the user experience. 

This project was my hands-on deep dive into modern backend API design, NoSQL database management, and crafting a premium, European-minimalist UI.

---

## 🛠️ The Tech Stack

I chose tools that are currently dominating the industry standards:
* **Framework:** Next.js 15 (React 18) utilizing the modern `app` directory.
* **Database:** MongoDB Atlas (accessed via the official Node.js driver).
* **Styling:** Tailwind CSS for utility-first styling.
* **UI/UX Polish:** Framer Motion (for fluid page transitions) and Lucide React (for crisp iconography).
* **Hosting:** Deployed on Vercel for edge-network speeds.

---

## 🧠 What I Engineered (Under the Hood)

Here is a breakdown of the specific architectural challenges I tackled in this build:

### 1. Solving the Serverless Database Crash
If you deploy a standard Node/Express database connection in Next.js, every API request spins up a new connection. Under heavy traffic, this instantly exhausts the MongoDB connection pool and crashes the app. 
* **My Solution:** I implemented a singleton caching pattern in `lib/mongodb.js`. During development, it checks the global Node object (`global._mongoClientPromise`) and reuses the existing active connection, completely preventing database timeouts.

### 2. The "Hybrid" URL Generation Engine
I wanted to give users the best of both worlds: speed and customization.
* **The Logic:** When a POST request hits `/api/generate`, my backend checks if the user provided a custom alias (e.g., `stenox.com/portfolio`). If they did, it queries the database to ensure it's strictly unique (`409 Conflict` if taken). If they left it blank, the engine automatically falls back to generating a highly collision-resistant, 6-character random cryptographic string.

### 3. Asynchronous Dynamic Redirection & Analytics
The core feature of the app lives in a single dynamic server component: `app/[shorturl]/page.js`.
* **The Logic:** When a user hits a short link, this route catches the parameter at the server level. Before issuing the `301` redirect to the actual destination, it uses MongoDB's atomic `$inc` operator to silently increment a `clicks` counter in the database. This allows for massive read/write scale without race conditions.

### 4. A "No-Jank" Premium UI
I strictly avoided the "clunky template" look. 
* **The Logic:** By utilizing Framer Motion's `AnimatePresence` and a custom `template.js` file, the page loads don't just snap—they breathe. I implemented a sticky glassmorphism navbar that prevents content overlap, floating error/success states, and a 1-click "copy to clipboard" interactive button using the browser's native clipboard API.

### 5. Responsive Design & Custom Branding
A premium SaaS product must be completely device-agnostic. 
* **The Logic:** I utilized Tailwind's mobile-first utility classes (`sm:`, `md:`) to ensure the layout, grid structures, and padding scale perfectly down to the narrowest screens (like an iPhone SE). The sticky navigation bar intelligently condenses its layout on mobile devices by hiding non-essential text while retaining intuitive icons. Furthermore, I stripped out the default Next.js boilerplate and engineered a mathematical, custom-built SVG favicon (`icon.svg`) to give the browser tab a unified, premium brand identity.

### 6. Technical SEO & Social Media Optimization
A product isn't complete until it's ready to be shared.
* **The Logic:** I utilized the Next.js 15 Metadata API to inject dynamic Open Graph (OG) tags, Twitter cards, and targeted keywords directly into the server-side layout. By configuring absolute URLs and custom social preview images (`og-image.png`), any StenoxLinks URL shared on platforms like LinkedIn, Discord, or Twitter will automatically generate a premium, large-format visual card. Furthermore, the reliance on server components ensures instant Largest Contentful Paint (LCP) and zero Cumulative Layout Shift (CLS), perfectly optimizing Core Web Vitals.

---

## 📚 What I Learned

Building StenoxLinks pushed me significantly forward as a full-stack developer. Specifically, I learned:
1. **Next.js 15 Quirks:** How to properly `await` params in dynamic routes, a brand-new requirement in the latest Next.js release.
2. **Backend Validation:** Never trust the client. I learned how to set up strict server-side validation and return proper HTTP status codes (`201`, `400`, `409`, `500`) instead of just failing silently.
3. **Atomic Database Operations:** Writing data efficiently without pulling the whole document into memory first.

---

## 🚀 Future Scope (Where I'm taking this next)

The foundation is rock solid, and I plan to evolve this into a fully-fledged SaaS platform. My roadmap includes:
* **An Analytics Dashboard:** Building a protected route where users can see exactly how many times their links were clicked over time.
* **Authentication:** Integrating NextAuth.js so users can claim links permanently and manage them from a personal dashboard.
* **QR Code Integration:** Automatically generating an SVG QR code for every shortened link.

---

## 💻 Run it Locally

If you want to pull down the code and run the engine yourself, it's super easy:

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/MAYANK25K/stenoxlinks.git](https://github.com/MAYANK25K/stenoxlinks.git)
   cd stenoxlinks

   # URL Shortener

## Setup Instructions

### 1. Install the Dependencies

Run the following command to install all required packages:

```bash
npm install
```

---

### 2. Wire Up the Database

Create a `.env.local` file in the **root directory** of the project and add your MongoDB Atlas connection string.

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/urlshortener
```

Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

---

### 3. Start the Server

Run the development server with the following command:

```bash
npm run dev
```

---

### 4. Open the Application

Open the following URL in your browser:

```
http://localhost:3000
```

You can now start shortening URLs.
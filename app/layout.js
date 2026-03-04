import "./globals.css";
import Navbar from "@/components/Navbar";

// Premium SEO & Social Media Meta Tags
export const metadata = {
  title: "StenoxLinks | Premium Custom URL Shortener",
  description: "Transform your long, cumbersome URLs into clean, brandable links instantly. Engineered for speed, security, and simplicity.",
  keywords: ["URL shortener", "custom links", "link management", "Next.js", "SaaS", "open source"],
  authors: [{ name: "Mayank" }],
  metadataBase: new URL("https://stenox-links.vercel.app/"), // Update this with your actual Vercel URL after deployment
  openGraph: {
    title: "StenoxLinks | Premium Custom URL Shortener",
    description: "Transform your long, cumbersome URLs into clean, brandable links instantly.",
    url: "/",
    siteName: "StenoxLinks",
    images: [
      {
        url: "/og-image.png", // Add a 1200x630 screenshot of your app to the 'public' folder!
        width: 1200,
        height: 630,
        alt: "StenoxLinks Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StenoxLinks | Premium Custom URL Shortener",
    description: "Transform your long, cumbersome URLs into clean, brandable links instantly.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        <Navbar />
        {/* 'children' represents whatever page the user is currently visiting */}
        {children} 
      </body>
    </html>
  );
}
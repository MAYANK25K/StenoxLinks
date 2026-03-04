import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "StenoxLinks - Free Custom URL Shortener",
  description: "Shorten your lengthy URLs into clean, brandable links instantly.",
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
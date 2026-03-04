import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function RedirectPage({ params }) {
    // FIX: Next.js 15 requires us to "await" the params object!
    const resolvedParams = await params; 
    const shorturl = resolvedParams.shorturl;

    const client = await clientPromise;
    const db = client.db("urlshortener");
    const collection = db.collection("links");

    const linkData = await collection.findOne({ shorturl: shorturl });

    if (linkData) {
        // Increment the click counter
        await collection.updateOne(
            { shorturl: shorturl }, 
            { $inc: { clicks: 1 } }
        );

        // Redirect to the original URL
        redirect(linkData.url);
    } else {
        // Failsafe: if the short link doesn't exist in the database
        redirect("/"); 
    }
}
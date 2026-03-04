import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    try {
        // 1. Parse the incoming data from the frontend
        const body = await request.json();
        const { url, shorturl } = body;

        // 2. Basic Validation: Make sure they actually sent a URL
        if (!url) {
            return Response.json(
                { success: false, error: "Original URL is required." }, 
                { status: 400 } // 400 Bad Request
            );
        }

        // 3. Connect to our Database Layer
        const client = await clientPromise;
        const db = client.db("urlshortener"); // Name of your database
        const collection = db.collection("links"); // Name of your table/collection

        // 4. The Hybrid Logic: Use custom if provided, otherwise generate random
        let finalShortUrl = shorturl;
        
        if (!finalShortUrl) {
            // Generates a random 6-character alphanumeric string
            finalShortUrl = Math.random().toString(36).substring(2, 8); 
        }

        // 5. Collision Check: Does this exact shorturl already exist in our DB?
        const existingLink = await collection.findOne({ shorturl: finalShortUrl });
        
        if (existingLink) {
            return Response.json(
                { success: false, error: "This short URL is already taken. Please try another." }, 
                { status: 409 } // 409 Conflict
            );
        }

        // 6. Write to Database (Including our click analytics counter!)
        await collection.insertOne({
            url: url,                  // The long destination URL
            shorturl: finalShortUrl,   // The custom or random short code
            clicks: 0,                 // Starting our analytics counter at zero
            createdAt: new Date()      // Timestamp for when it was created
        });

        // 7. Send the success response back to the frontend
        return Response.json(
            { success: true, message: "URL Shortened successfully!", shorturl: finalShortUrl }, 
            { status: 201 } // 201 Created
        );

    } catch (error) {
        // Production failsafe: Catch unexpected server crashes
        console.error("Database Error:", error);
        return Response.json(
            { success: false, error: "Internal Server Error" }, 
            { status: 500 } // 500 Internal Server Error
        );
    }
}
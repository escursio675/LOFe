export default async function handler(req, res){
    const API_URL = "https://api.counterapi.dev/v2/lofe-site/lofe-count/";

    try{

        await(`${API_URL}up`, {method: "GET"});

        const response = await fetch(API_URL);
        const data = await response.json();

    } catch(error){
        console.error("Error in serverless function:", error);
        res.status(500).json({ error: "Failed to fetch visitor count" });
    }

}
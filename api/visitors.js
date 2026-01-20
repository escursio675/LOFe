export default async function handler(req, res) {
  const API_URL = process.env.COUNTER_API_URL;

  if (!API_URL) {
    return res.status(500).json({ error: "COUNTER_API_URL not set" });
  }

  try {
    await fetch(`${API_URL}up`, {
      method: "GET",
    });

    const response = await fetch(API_URL);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in serverless function:", error);
    return res.status(500).json({ error: "Failed to fetch visitor count" });
  }
}

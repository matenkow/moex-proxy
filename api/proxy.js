export default async function handler(req, res) {
  const target = req.query.url;

  if (!target || !target.startsWith("https://iss.moex.com/")) {
    return res.status(400).json({ error: "Bad target" });
  }

  try {
    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json"
      }
    });

    const body = await response.text();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(response.status).send(body);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
}

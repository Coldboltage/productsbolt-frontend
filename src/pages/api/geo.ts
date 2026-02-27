export default function handler(req, res) {
  const country = req.headers["x-vercel-ip-country"];
  console.log(country);
  res.status(200).json({ country });
}

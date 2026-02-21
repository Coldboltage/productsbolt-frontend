// pages/api/revalidate.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const secret = req.query.secret;
  const productName = req.query.productName;

  if (typeof secret !== "string" || secret !== process.env.WEBSITE_SECRET) {
    return res.status(401).json({ ok: false, message: "Invalid secret" });
  }

  if (typeof productName !== "string" || productName.length < 10) {
    return res
      .status(400)
      .json({ ok: false, message: "Missing/invalid productName" });
  }

  const path = `/product/${productName}`;
  console.log(`/product/${productName}`);

  try {
    await res.revalidate(path);
    const response = { ok: true, path, productName, ts: Date.now() };
    console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ ok: false, message: String(e) });
  }
}

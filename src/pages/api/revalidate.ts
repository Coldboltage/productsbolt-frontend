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
  const productId = req.query.productId;

  if (typeof secret !== "string" || secret !== process.env.WEBSITE_SECRET) {
    return res.status(401).json({ ok: false, message: "Invalid secret" });
  }

  if (typeof productId !== "string" || productId.length < 10) {
    return res
      .status(400)
      .json({ ok: false, message: "Missing/invalid productId" });
  }

  const path = `/product/${productId}`;

  try {
    await res.revalidate(path);
    const response = { ok: true, path, productId, ts: Date.now() };
    console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ ok: false, message: String(e) });
  }
}

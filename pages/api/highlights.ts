// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const response=await fetch("https://web-dev.dev.kimo.ai/v1/highlights");

  res.status(200).json(await response.json());
}

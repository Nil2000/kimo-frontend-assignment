// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Activity } from '@/models/ActivityModel';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const searchQuery=req.query.q?.toString();
  if(!searchQuery){
    return res.status(400).json({error:"Please provide a search query"});
  }

  const response=await fetch(`https://web-dev.dev.kimo.ai/v1/activities/${searchQuery}`);

  const activityResponse:Activity=await response.json();

  res.status(200).json(activityResponse);
}

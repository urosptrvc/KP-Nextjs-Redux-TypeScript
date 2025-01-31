import { NextApiRequest, NextApiResponse } from 'next';
import { ads } from "@/ads";
import { Ad } from '@/lib/types/ad';
import {rateLimit} from "@/lib/utils/rateLimit";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default async function GET(
    req: NextApiRequest,
    res: NextApiResponse<Ad[] | { error: string }>
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      await limiter.check(res, 10, 'CACHE_TOKEN');
    } catch {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }

    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000" || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
import { NextApiRequest, NextApiResponse } from 'next';
import { ads } from "../../ads";
import { Ad } from '@/lib/types/ad';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ad[]>
) {
  res.status(200).json(ads);
}
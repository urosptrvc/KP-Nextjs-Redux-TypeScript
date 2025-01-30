import { NextApiRequest, NextApiResponse } from 'next';
import { ads } from "../../../ads";
import { Ad } from '@/lib/types/ad';

interface ErrorResponse {
  error_code: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ad | ErrorResponse>
) {
  const {
    query: { adId = "" },
  } = req;

  if (
    [
      "145679023",
      "145679022",
      "145679014",
      "145679004",
      "145679002",
      "145679001",
    ].includes(adId as string)
  ) {
    res.status(404).json({ error_code: "ad_deleted" });
    return;
  }

  const ad = ads.find((ad) => ad.ad_id === Number(adId));
  
  return ad
    ? res.status(200).json(ad)
    : res.status(404).json({ error_code: "not_found" });
}
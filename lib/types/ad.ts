export interface Ad {
  ad_id: number;
  name: string;
  photo_path1?: string;
  photo1_tmb_300x300: string;
  price: string | number;
  currency: string;
  description: string;
  category_name: string;
  group_name: string;
  location_name: string;
}

export interface AdState {
  trackedAds: Record<number, Ad>;
}
export type LabsResponseData = {
  markers: {
    id: number;
    name: string;
    slug: string;
    description: string;
    lab_id: number;
    provider_id: string;
    type: null;
    unit: null;
    price: string;
  }[];
  total: number;
  page: number;
  size: number;
};

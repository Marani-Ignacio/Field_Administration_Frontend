export interface Seed {
  _id?: string;
  name: string;
  description: string;
  fields: [];
}

export interface SeedApi {
  _id?: string;
  name: string;
  description: string;
  fields: {
    _id?: string;
    name?: string;
    hectare?: number;
    location?: string;
    latitude?: number;
    longitude?: number;
  }[];
}
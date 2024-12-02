export interface Field {
  _id?: string;
  name: string;
  hectare: number;
  location: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  ownerId: string;
  seedId: string;
}

export interface FieldApi {
  _id?: string;
  name: string;
  hectare: number;
  location: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  ownerId: {
    _id?: string;
    name?: string;
    lastName?: string;
    dni?: number;
  };
  seedId: {
    _id?: string;
    name?: string;
  };
}
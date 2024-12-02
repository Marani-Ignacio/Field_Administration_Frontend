export interface User {
  _id?: string;
  name: string;
  lastName: string;
  birthDate: Date;
  email: string;
  dni: number;
  isAdmin: boolean;
  firebaseUid: string;
}

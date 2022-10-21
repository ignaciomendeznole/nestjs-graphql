export interface JwtPayload {
  id: string;
  fullName: string;
  email: string;
  iat: number;
  exp: number;
}

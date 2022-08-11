import { sign } from "jsonwebtoken";

export const authenticateUser = (_id: string): string => {
  return sign({ _id }, process.env.USER_JWT_KEY || '', {
    expiresIn: '30d',
  });
}

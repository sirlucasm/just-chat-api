import { IUser } from "../app/interfaces/IUser";

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser;
    }
  }
}

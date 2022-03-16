declare global {
  namespace Express {
    interface Request {
      uid: string; //or other type you would like to use
    }
  }
}

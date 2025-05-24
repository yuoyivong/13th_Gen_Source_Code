// login type
interface UserCredentails {
  email: string;
  password: string;
}

// user registration type
interface UserRegistration {
  fullName: string;
  email: string;
  password: string;
}

// expose interface
export type { UserCredentails, UserRegistration };

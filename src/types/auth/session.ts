// session
interface Session {
  user: {
    id?: string;
    token?: string;
  };
  expires: string;
}

// expose session
export type { Session };

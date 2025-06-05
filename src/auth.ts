import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginService } from "./services/auth-service";
import { UserCredentails } from "./types/auth/auth";

// a function to decode JWT and get expiration

const getJWTExpiration = (token: string): Date | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp) {
      return new Date(payload.exp * 1000);
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        try {
          const response = await loginService(credentials as UserCredentails);
          console.log("Token user : ", response);

          // Assuming your APIResponse has a 'payload' property with the user data
          if (!response || !response.payload) {
            throw new Error("Invalid credentials");
          }

          // Return only the user object as expected by NextAuth
          return response.payload;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours in seconds as a expired duration
  },
  pages: {
    signIn: "/login",
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;

        // extract JWT expiration
        if (user?.token) {
          const jwtExpiration = getJWTExpiration(user?.token);
          if (jwtExpiration) {
            token.exp = Math.floor(jwtExpiration.getTime() / 1000);
          }
        }
      }
      console.log("Tokennnn : ", token);
      console.log("Userrrrr : ", user);

      return token; // Ensure token is always returned
    },
    session: async ({ session, token }) => {
      console.log("Token.user : ", token.user);

      if (token && session) {
        // extract user id and token safely
        const user = token.user as TokenUser;

        session.user = {
          ...session.user,
          id: user?.id ?? null,
          token: user?.token ?? user?.payload?.token ?? null,
        };
      }

      // set session expiration based on JWT token expiration
      if (token.exp) {
        session.expires = new Date(token.exp * 1000) as unknown as string &
          Date;
      }
      console.log("Token session : ", session);

      return session;
    },
  },
});

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginService } from "./services/auth-service";
import { UserCredentails } from "./types/auth/auth";

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
          const user = await loginService(credentials as UserCredentails);
          console.log("Token user : ", user);

          if (!user) {
            throw new Error("Invalid credentials");
          }

          return user;
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
  },
  pages: {
    signIn: "/login",
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      console.log("Tokennnn : ", token);
      console.log("Userrrrr : ", user);

      return token; // Ensure token is always returned
    },
    session: async ({ session, token }) => {
      console.log("Token.user : ", token.user);

      if (token && session) {
        session.user = {
          ...session.user,
          id: (token.user as TokenUser).id,
          token: (token.user as TokenUser).payload.token,
        };
      }
      console.log("Token session : ", session);

      return session;
    },
  },
});

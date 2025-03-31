import NextAuth from "next-auth";
import { TokenUser } from "./interface/types";
import { User } from "./interface/user-type";
import Credentials from "next-auth/providers/credentials";
import { loginService } from "./services/auth-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        console.log("credentials", credentials);

        const user: User = {
          email: credentials?.email as string,
          password: credentials?.password as string,
        };

        // call login service
        const data = await loginService(user);

        return data.payload || null;
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session) {
        session.user = {
          ...session.user,
          id: (token.user as TokenUser).id,
          token: (token.user as TokenUser).token,
        };
      }
      return session;
    },
  },
});

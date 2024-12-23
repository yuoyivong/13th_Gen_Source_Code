import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginService } from "./service/authService";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userCredentails = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const response = await loginService(userCredentails);
        return response?.payload;
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return { ...session, ...token };
    },

    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }

      return { ...token };
    },
  },

  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.AUTH_SECRET,
    maxAge: 5 * 60 * 1000,
  },
  pages: {
    signIn: "/login",
  },
});

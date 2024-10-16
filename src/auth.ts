import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        if(!email || !password) {
          throw new CredentialsSignin("Missing credentials");
        }
        if(email!=="anshal@gmail.com" || password !== "123456"){
            throw new CredentialsSignin("Invalid credentials");
        }
        return { email };
      },
    }),
  ],
  pages:{
    signIn: "/login",
  },
  secret: process.env.SECRET,
});

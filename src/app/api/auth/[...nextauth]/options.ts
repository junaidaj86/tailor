import prismadb from "@/lib/prismadb";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

import * as bcrypt from 'bcrypt';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await prismadb.user.findFirst({
          where: {
            email: credentials?.username
          }
        })
        if (user != null && credentials?.password != null && await bcrypt.compare(credentials.password, user.password,)) {
          const { password, ...userWithOutPassword } = user;
          return userWithOutPassword;
        } else {
          return null;
        }
      }
    })
  ]
}
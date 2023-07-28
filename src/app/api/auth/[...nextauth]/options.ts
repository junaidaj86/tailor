import prismadb from "@/lib/prismadb";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

import { GithubProfile } from 'next-auth/providers/github'
import GitHubProvider from 'next-auth/providers/github'
import * as bcrypt from 'bcrypt';

export const options: NextAuthOptions = {
  providers: [GitHubProvider({
    profile(profile: GithubProfile) {
        //console.log(profile)
        return {
            ...profile,
            role: profile.role ?? "user",
            id: profile.id.toString(),
            image: profile.avatar_url,
        }
    },
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
}),
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
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { comparePassword } from "@/lib/hash"

if (!process.env.NEXTAUTH_SECRET || !process.env.NEXTAUTH_URL) {
  console.warn("NEXTAUTH_SECRETまたはNEXTAUTH_URLが設定されていません。envファイルを確認してください。")
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: 'text', label: "Email" },
        password: { type: 'password', label: "Password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user || !user.password_hash) return null

        const valid = await comparePassword(credentials.password, user.password_hash)
        if (!valid) return null

        // メール未認証ならログイン不可とする場合
        if (!user.email_verified_at) return null

        return user
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      // ログイン時にユーザーが存在すればtokenへidとroleをセット
      if (user) {
        token.id = user.id.toString()
        token.role = user.role // roleをtokenに反映
      }
      return token
    },
    async session({ session, token }) {
      // tokenからユーザー情報を取得してsessionに反映
      if (token?.id) {
        const userId = Number(token.id)
        const dbUser = await prisma.user.findUnique({ where: { id: userId } })
        if (dbUser) {
          session.user = {
            ...session.user,
            id: dbUser.id.toString(),
            emailVerified: !!dbUser.email_verified_at,
            role: dbUser.role // sessionにもroleを反映
          }
        }
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
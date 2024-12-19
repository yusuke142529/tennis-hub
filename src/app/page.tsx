// src/app/page.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import ClientHome from "./ClientHome"

export const metadata = {
  title: "Tennis HUB",
  description: "A community platform for tennis enthusiasts to improve skills, share knowledge, and grow the tennis culture."
}

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email ?? null

  // クライアントコンポーネントへユーザー情報を渡す
  return <ClientHome userEmail={userEmail} />
}
// src/app/admin/layout.tsx
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import "../globals.css"
import ClientLayout from "./ClientLayout" // クライアントコンポーネントをインポート

export const metadata = {
    title: "Admin Dashboard",
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'admin') {
        redirect('/')
    }
  
    // sessionをクライアントコンポーネントへ渡す必要があればpropsとして渡すことも可能
    return <ClientLayout>{children}</ClientLayout>
}
// src/app/admin/page.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import AdminDashboardClient from "./AdminDashboardClient" // クライアントコンポーネント

export default async function AdminDashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
        redirect('/')
    }

    return <AdminDashboardClient session={session} />
}
// src/app/profile/page.tsx

// src/app/profile/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";

export const metadata = {
  title: "Your Profile | Tennis HUB",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    // 未ログインの場合はサインインへリダイレクト
    redirect("/signin");
  }

  // プロフィール情報の取得（BigIntではなくparseIntで変換）
  const userId = parseInt(session.user.id, 10);
  const profile = await prisma.profile.findUnique({
    where: { user_id: userId },
  });

  return (
    <div>
      {/* 全てのUIはProfileFormでChakraコンポーネントを使用 */}
      <ProfileForm initialData={profile} />
    </div>
  );
}
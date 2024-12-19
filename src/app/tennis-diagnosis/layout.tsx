import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { DiagnosisProvider } from '@/lib/store';
import '../globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'テニス・パーソナリティAI診断',
};

export default async function TennisDiagnosisLayout({ children }: { children: React.ReactNode }) {
  // authOptionsを渡す
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/signin');
  }

  return (
    <DiagnosisProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto p-4">
          {children}
        </div>
      </div>
    </DiagnosisProvider>
  );
}
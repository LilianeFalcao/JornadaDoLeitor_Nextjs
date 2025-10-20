import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Login",
  description: "Your favorite Habit Tracker",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full auth-wrapper">
      <AuthProvider>
        {children}
      </AuthProvider>
      <Toaster richColors position="top-right" />
    </div>
  );
}
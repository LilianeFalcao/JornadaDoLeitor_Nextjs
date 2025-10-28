import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Página de Login",
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
<<<<<<< HEAD
=======
      <Toaster richColors position="top-right" />
>>>>>>> 55a7e8956e83ca4fef89d7bec2cbce7faed2f279
    </div>
  );
}
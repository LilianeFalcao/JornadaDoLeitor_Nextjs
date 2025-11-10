import { BodyContainer } from "@/styles/globals";
//components
import { Header } from "@/components/Header/index";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <AuthProvider>
      <BodyContainer>
        <Header />
          <main>
            {children}
          </main>
        <Footer />
      </BodyContainer>
    </AuthProvider>
  );
}

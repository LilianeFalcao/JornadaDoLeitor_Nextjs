import { BodyContainer } from "@/styles/globals";
//components
import { Header } from "@/components/Header/index";
import Footer from "@/components/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <BodyContainer>
        <Header />
          <main>
            {children}
          </main>
        <Footer />
      </BodyContainer>
    </html>
  );
}

export default function LoginLayout(
  {
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
          <main>{children}</main>
      </body>
    </html>
  );
}

// import theme style scss file
import "@/styles/theme.scss";

export const metadata = {
  title: "TurnoPort - Admin",
  description: "TurnoPort - Admin",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="bg-light">{children}</body>
    </html>
  );
}

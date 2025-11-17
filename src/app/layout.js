import "./globals.css";

export const metadata = {
  title: "Movie Site",
  description: "Clean layout",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

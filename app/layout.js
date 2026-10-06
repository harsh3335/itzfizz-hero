import "./globals.css";

export const metadata = {
  title: "Welcome Itzfizz | Scroll Hero",
  description: "Scroll-driven hero animation built with Next.js, GSAP and Tailwind.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

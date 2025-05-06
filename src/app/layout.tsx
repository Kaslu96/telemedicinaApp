import styles from "./layout.module.css"
import {Poppins} from 'next/font/google'
import "./globals.css";

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.className} && ${styles.layout}`}>
        {children}
      </body>
    </html>
  );
}

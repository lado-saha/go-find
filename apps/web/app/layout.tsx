import '@/app/ui/global.css';
import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: {
    template: '%s | GoFindV2',
    default: 'GoFindV2',
  },
  description: 'Searching is our nature.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

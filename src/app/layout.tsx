import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mohammad Hasan Parvez | 3D Developer World | H Tech Provision IT',
  description:
    'Explore the futuristic 3D digital world of Mohammad Hasan Parvez - Full Stack Developer & Laravel Specialist. Explore buildings, projects, skills, and enterprise services.',
  keywords: [
    'Mohammad Hasan Parvez',
    'Laravel Specialist',
    'Full Stack Developer',
    'H Tech Provision IT',
    'PHP',
    'Next.js',
    'Three.js',
    '3D Portfolio'
  ],
  authors: [{ name: 'Mohammad Hasan Parvez' }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full dark`}>
      <body className="h-full w-full bg-[#030712] text-[#f3f4f6] overflow-hidden antialiased">
        {children}
      </body>
    </html>
  );
}

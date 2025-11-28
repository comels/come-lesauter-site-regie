import './globals.css';
import Navbar from '../components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Côme Le Sauter - Régisseur Production',
  description:
    'Portfolio de Côme Le Sauter, régisseur pour productions audiovisuelles et commerciales. Expertise en repérage de lieux, logistique, restauration et gestion efficace des tournages.',
  keywords: ['régisseur', 'production', 'audiovisuel', 'commercial', 'cinéma', 'tournage', 'logistique'],
  authors: [{ name: 'Côme Le Sauter' }],
  creator: 'Côme Le Sauter',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://votre-domaine.com',
    siteName: 'Côme Le Sauter - Régisseur',
    title: 'Côme Le Sauter - Régisseur Production',
    description:
      'Portfolio de Côme Le Sauter, régisseur pour productions audiovisuelles et commerciales. Expertise en repérage de lieux, logistique, restauration et gestion efficace des tournages.',
    images: [
      {
        url: '/about-4.jpg',
        width: 1200,
        height: 630,
        alt: 'Côme Le Sauter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Côme Le Sauter - Régisseur Production',
    description:
      'Portfolio de Côme Le Sauter, régisseur pour productions audiovisuelles et commerciales.',
    images: ['/about-4.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_io/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/favicon_io/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/favicon_io/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/favicon_io/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="bg-stone-100 min-h-screen font-sans text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}


import type {Metadata} from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Cinzel, Baloo_2, Montserrat } from 'next/font/google';
import './globals.css'; // Global styles

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '700', '900'],
});

const baloo2 = Baloo_2({
  subsets: ['latin'],
  variable: '--font-baloo',
  weight: ['400', '500', '600', '700', '800'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['600', '700', '800'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mathsultime.fr';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Maths Ultime',
  description:
    'Guide vidéo premium : comprends ton cours avant de l\'apprendre. Méthode visuelle ChadSciences pour le lycée. Offre de lancement 47 € (au lieu de 67 €).',
  icons: {
    icon: [
      { url: '/logo_maths_ultime_detoured.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: { url: '/logo_maths_ultime_detoured.png', sizes: '180x180' },
  },
  openGraph: {
    title: 'Maths Ultime — Guide vidéo ChadSciences',
    description:
      'Méthode visuelle pour le lycée : parcours structuré, vidéos et fiches. Offre de lancement 47 €.',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/chadlogo.jpeg', width: 1200, height: 1200, alt: 'Maths Ultime — ChadSciences' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maths Ultime — ChadSciences',
    description: 'Méthode visuelle pour viser de meilleures notes en maths au lycée.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className={`${cinzel.variable} ${baloo2.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="antialiased font-sans" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

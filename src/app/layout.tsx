import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import GlobalBackground from "./components/GlobalBackground";

export const metadata: Metadata = {
  title: "BeaYOUtiful Foundation - Empowering Young People",
  description: "Empowering young people to recognize their inherent value and build confidence through community, connection, and acts of kindness.",
  keywords: ["youth empowerment", "confidence building", "mentorship", "leadership", "community", "nonprofit"],
  authors: [{ name: "BeaYOUtiful Foundation" }],
  creator: "BeaYOUtiful Foundation",
  publisher: "BeaYOUtiful Foundation",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://beayoutifulfoundation.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "BeaYOUtiful Foundation - Empowering Young People",
    description: "Empowering young people to recognize their inherent value and build confidence through community, connection, and acts of kindness.",
    url: 'https://beayoutifulfoundation.org',
    siteName: 'BeaYOUtiful Foundation',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BeaYOUtiful Foundation - Empowering Young People',
    description: 'Empowering young people to recognize their inherent value and build confidence through community, connection, and acts of kindness.',
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js" />
      </head>
      <body className="antialiased">
        <GlobalBackground />
        {children}
      </body>
    </html>
  );
}

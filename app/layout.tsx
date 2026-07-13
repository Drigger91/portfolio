import './globals.css'

export const metadata = {
  title: 'Piyush Tiwari — Senior Software Development Engineer',
  description:
    'Backend engineer at Razorpay. Region-agnostic payments, AI orchestration, and event-driven systems. Explore in terminal or classic mode.',
  metadataBase: new URL('https://piyushtiwari.dev'),
  openGraph: {
    title: 'Piyush Tiwari — Senior Software Development Engineer',
    description:
      'Backend engineer at Razorpay. Region-agnostic payments, AI orchestration, and event-driven systems.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

import './globals.css'

export const metadata = {
  title: 'KarmaPhala — The Results of One\'s Deeds',
  description: 'Trusted local helpers for elders and families. Verified providers, community care, whenever you need.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}

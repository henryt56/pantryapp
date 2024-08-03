import ThemeRegistry from './ThemeRegistry'

export const metadata = {
  title: 'Inventory Manager',
  description: 'Inventory management application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
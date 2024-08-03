import ThemeRegistry from './ThemeRegistry'

export const metadata = {
  title: 'Pantry App',
  description: 'Tracks contents in pantry',
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
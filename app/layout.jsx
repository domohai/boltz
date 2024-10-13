import '@styles/global.css';
import Providers from '@components/Providers';

export const metadata = {
  title: "BoltZ",
  description: "An express management system",
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
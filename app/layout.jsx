import '@styles/global.css';
import Providers from '@components/Providers';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: "BoltZ",
  description: "An express management system",
}

const RootLayout = async ({ children }) => {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
import '@styles/global.css';
import { Html } from 'next/document';

export const metadata = {
  title: "BoltZ",
  description: "An express management system"
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
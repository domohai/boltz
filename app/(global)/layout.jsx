import Nav from '@components/Nav';
import Footer from '@components/Footer';

const GlobalLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Đức Hải */}
      {/* Navbar start */}
      <Nav />
      {/* NavBar end */}
      <main className='min-h-[12rem]'>
        {children}
      </main>
      {/* Footer start */}
      <Footer />
      {/* Footer end */}
    </div>
  )
}


export default GlobalLayout
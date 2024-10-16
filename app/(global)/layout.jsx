import Nav from '@components/Nav';
import Footer from '@components/Footer';

const GlobalLayout = ({ children }) => {
  return (
    <div>
      {/* Đức Hải */}
      {/* Navbar start */}
      <Nav />
      {/* NavBar end */}
      
      {/* Delete this when add page Content ;) */}
      <div style={styles.contentWrapper}>
        {children}
      </div>
      
      {/* Footer start */}
      <Footer />
      {/* Footer end */}
    </div>
  )
}

// Delete this when add page Content ;)
const styles = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', 
  },
  contentWrapper: {
    flex: '1', 
    backgroundColor: '#f0f0f0', 
    padding: '300px', 
  }
};

export default GlobalLayout
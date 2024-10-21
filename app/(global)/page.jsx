import Banner from '@components/Banner';
import HomepageTabs from '@components/HomepageTabs';


const HomePage = () => {
  return (
    <div>
      {/* Đức Hiệp */}
      {/* Banner start */}
      <Banner />
      {/* Banner end */}

      {/* Hữu Đức */}
      {/* Nhóm tra cứu */}
      <HomepageTabs />
      {/* Nhóm tra cứu */}
    </div>
  )
}

export default HomePage;

import HomepageTabs from '@components/HomepagetabsComp/HomepageTabs';
import Banner from '@components/Banner';

const HomePage = () => {
  return (
    <section>
      {/* Đức Hiệp */}
      {/* Banner start */}
      <Banner />
      {/* Banner end */}

      {/* Hữu Đức */}
      {/* Nhóm tra cứu */}
      <HomepageTabs />
      {/* Nhóm tra cứu */}
    </section>
  )
}

export default HomePage;

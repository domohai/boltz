'use client';
import React, { useState } from 'react';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { Input, Button, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { SearchIcon } from './SearchIcon';
import { address } from "./dataProvinces"; // Tỉnh/TP
import { districts } from "./dataDistricts"; // Quận/Huyện

const HomepageTabs = () => {
  const [activeKey, setActiveKey] = useState('tracking');
  const [selectedFromProvince, setSelectedFromProvince] = useState(""); // Quản lý tỉnh "Gửi từ"
  const [selectedToProvince, setSelectedToProvince] = useState(""); // Quản lý tỉnh "Gửi đến"
  const [fromDistricts, setFromDistricts] = useState([]); // Danh sách huyện "Gửi từ"
  const [toDistricts, setToDistricts] = useState([]); // Danh sách huyện "Gửi đến"
  const [selectedFromDistrict, setSelectedFromDistrict] = useState(""); // Quản lý huyện "Gửi từ"
  const [selectedToDistrict, setSelectedToDistrict] = useState(""); // Quản lý huyện "Gửi đến"
  const [weight, setWeight] = useState(""); // Quản lý trọng lượng

  // Xử lý khi chọn tab
  const handleTabChange = (key) => {
    setActiveKey(key);
  };

// Xử lý khi chọn tỉnh "Gửi từ"
  const handleFromProvinceSelect = (item) => {
  setSelectedFromProvince(item.value); // Cập nhật tỉnh đã chọn
  const filteredDistricts = districts[item.value] || []; // Lọc huyện theo tỉnh đã chọn
  setFromDistricts(filteredDistricts); // Cập nhật danh sách quận/huyện
  setSelectedFromDistrict(""); // Đặt lại huyện khi tỉnh thay đổi
};

// Xử lý khi chọn tỉnh "Gửi đến"
  const handleToProvinceSelect = (item) => {
  setSelectedToProvince(item.value); // Cập nhật tỉnh đã chọn
  const filteredDistricts = districts[item.value] || []; // Lọc huyện theo tỉnh đã chọn
  setToDistricts(filteredDistricts); // Cập nhật danh sách quận/huyện
  setSelectedToDistrict(""); // Đặt lại huyện khi tỉnh thay đổi
};

  // Xử lý chọn huyện cho cả "Gửi từ" và "Gửi đến"
  const handleFromDistrictSelect = (item) => {
    setSelectedFromDistrict(item.value);
  };
  const handleToDistrictSelect = (item) => {
    setSelectedToDistrict(item.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Tabs
        variant="underlined"
        aria-label="Tabs"
        selectedKey={activeKey}
        onSelectionChange={handleTabChange}
      >
        <Tab key="tracking" title="Tra cứu bưu gửi" />
        <Tab key="estimation" title="Ước tính cước phí" />
        <Tab key="restricted" title="Tra hàng cấm gửi" />
      </Tabs>

      <div className="mt-4 w-full md:w-3/4">
        {activeKey === 'tracking' && (
          <Card>
            <CardBody>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4 items-center justify-center">
                <Input className="w-full" type="text" placeholder="Tra cứu bưu gửi" startContent={<SearchIcon />} />
                <Button className="px-5 py-2 rounded-full">Tra cứu</Button>
              </div>
            </CardBody>
          </Card>
        )}
        {activeKey === 'estimation' && (
          <Card>
            <CardBody>
              <h2 className="text-xl font-bold mb-4">Thông tin gửi hàng</h2>
              
              {/* Gửi từ */}
              <h3 className="text-lg font-semibold">Gửi từ</h3>
              <Autocomplete
                placeholder="Tỉnh/TP" className="mt-4 w-full"
                onItemSelect={handleFromProvinceSelect}
              >
                {address.map((item) => (
                  <AutocompleteItem key={item.value} value={item.value}>
                    {item.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
    
              <Autocomplete
                placeholder="Quận/huyện" className="mt-4 w-full"
                disabled={!selectedFromProvince} // Chỉ cho phép chọn khi tỉnh đã được chọn
                onItemSelect={handleFromDistrictSelect}
              >
                {fromDistricts.map((district) => (
                  <AutocompleteItem key={district} value={district}>
                    {district}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
    
              {/* Gửi đến */}
              <h3 className="text-lg font-semibold mt-6">Gửi đến</h3>
              <Autocomplete
                placeholder="Tỉnh/TP" className="mt-4 w-full"
                onItemSelect={handleToProvinceSelect}
              >
                {address.map((item) => (
                  <AutocompleteItem key={item.value} value={item.value}>
                    {item.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
    
              <Autocomplete
                placeholder="Quận/huyện" className="mt-4 w-full"
                disabled={!selectedToProvince}
                onItemSelect={handleToDistrictSelect}
              >
                {toDistricts.map((district) => (
                  <AutocompleteItem key={district} value={district}>
                    {district}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
    
              {/* Trọng lượng */}
              <h3 className="text-lg font-semibold mt-6">Trọng lượng (g)</h3>
              <Input
                type="number"
                placeholder="Nhập trọng lượng (gam)"
                className="mt-4 w-full"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
    
              <Button className="mt-6 px-5 py-2 rounded-full">Tính cước</Button>
            </CardBody>
          </Card>
        )}
        {activeKey === 'restricted' && (
          <Card>
            <CardBody>
              <h1 className="text-2xl font-bold">Tra cứu hàng cấm gửi</h1><br />
              <h3 className="text-xl font-bold">1. Danh mục vật phẩm, hàng hóa cấm gửi</h3><br />
              <h4 className="text-l font-bold">1.1. Danh mục vật phẩm, hàng hóa cấm gửi đối với bưu gửi EMS trong nước</h4><br />
              <p>
                Theo quy định của Nhà nước, các loại vật phẩm, hàng hóa sau bị cấm gửi:<br />
                - Các chất ma tuý và chất kích thích thần kinh.<br />
                - Vũ khí đạn dược, trang thiết bị kỹ thuật quân sự.<br />
                - Các loại văn hoá phẩm đồi truỵ, phản động; ấn phẩm, tài liệu nhằm phá hoại trật tự công cộng, chống Nhà nước Cộng hoà xã hội chủ nghĩa Việt Nam.<br />
                - Vật hoặc chất dễ nổ, dễ cháy và các chất gây nguy hiểm hoặc làm mất vệ sinh, gây ô nhiễm môi trường.<br />
                - Các loại vật phẩm, hàng hoá mà Nhà nước cấm lưu thông, cấm kinh doanh, cấm xuất khẩu, nhập khẩu.<br />
                - Sinh vật sống.<br />
                - Vật phẩm, ấn phẩm, hàng hoá cấm nhập vào nước nhận (theo thông báo của Hiệp hội EMS).<br />
                - Tiền Việt Nam, tiền nước ngoài và các giấy tờ có giá trị như tiền.<br />
                - Các loại kim khí quý (vàng, bạc, bạch kim...), các loại đá quý hay các sản phẩm khác được chế biến từ kim khí quý, đá quý.<br />
                - Bưu gửi chứa nhiều bưu gửi, gửi cho nhiều địa chỉ nhận khác nhau.<br />
                - Các vật phẩm, hàng hóa mà tính chất hoặc cách gói bọc có thể gây nguy hiểm cho người nhân viên khai thác, vận chuyển, người dân hoặc làm mất vệ sinh, gây ô nhiễm môi trường.
              </p><br />
              <h4 className="text-l font-bold">1.2. Danh mục vật phẩm, hàng hóa cấm gửi đối với bưu gửi EMS Quốc tế</h4><br />
              <p>
                Một số vật phẩm, hàng hóa dù có hoặc không được liệt kê trong danh mục “Hàng cấm gửi” tra cứu theo quy định từng nước cũng sẽ không được chấp nhận vận chuyển qua dịch vụ EMS quốc tế. Các mặt hàng bao gồm:<br />
                - Các vật phẩm bất hợp pháp, chất ma tuý, chất kích thích thần kinh, narcotics…<br />
                - Vũ khí, đạn dược, trang thiết bị kỹ thuật quân sự (bao gồm các vật phẩm có hình dáng tương tự; đồ chơi…).<br />
                - Các loại văn hoá phẩm đồi truỵ, phản động; ấn phẩm, tài liệu nhằm phá hoại trật tự công cộng, chống Nhà nước Cộng hoà xã hội chủ nghĩa Việt Nam.<br />
                - Vật hoặc chất dễ nổ, dễ cháy và các chất gây nguy hiểm hoặc làm mất vệ sinh, gây ô nhiễm môi trường.<br />
                - Các loại vật phẩm, hàng hoá mà Nhà nước cấm lưu thông, cấm kinh doanh, cấm xuất khẩu, nhập khẩu.<br />
                - Sinh vật (động vật, thực vật) sống; Chiến lợi phẩm săn bắn từ động vật (Ngà voi, vi cá mập, xác động vật…) và các sản phẩm khác bị giới hạn bởi Quy ước CITES hoặc nội luật.<br />
                - Vật phẩm, ấn phẩm, hàng hoá cấm nhập vào nước nhận (theo thông báo của Hiệp hội EMS, Bưu chính và chính phủ các nước…).<br />
                - Tiền Việt Nam, tiền nước ngoài và các giấy tờ có giá trị như tiền.<br />
                - Các loại kim khí quý, bán quý (vàng, bạc, bạch kim...), các loại đá quý, bán quý hay các sản phẩm khác được chế biến từ kim khí đá quý, bán quý.<br />
                - Pin (và các vật phẩm chứa pin).<br />
                - Hài cốt.<br />
                - Các vật phẩm, hàng hóa mà tính chất hoặc cách gói bọc có thể gây nguy hiểm cho người nhân viên khai thác, vận chuyển, người dân hoặc làm mất vệ sinh, gây ô nhiễm môi trường.<br />
                - Bưu gửi chứa nhiều bưu gửi, gửi cho nhiều địa chỉ nhận khác nhau.<br />
                - Hàng giả, hàng nhái, hàng hóa vi phạm bản quyền, quyền sở hữu trí tuệ…<br />
              </p><br />
              <h3 className="text-xl font-bold">2. Danh mục vật phẩm, hàng hóa gửi có điều kiện</h3><br />
              <p>
                - Bưu gửi có vật phẩm, hàng hoá để kinh doanh phải có chứng từ thuế theo quy định của pháp luật.<br />
                - Vật phẩm, hàng hoá xuất khẩu, nhập khẩu thuộc quản lý chuyên ngành phải thực hiện theo quy định của cơ quan quản lý chuyên ngành có thẩm quyền và theo thông báo của Hiệp hội Bưu chính thế giới.<br />
                - Vật phẩm, hàng hoá dễ bị hư hỏng, chất lỏng, chất bột đóng gói phải bảo đảm không gây hư hỏng, ô nhiễm bưu gửi khác.<br />
                - Vật phẩm, hàng hoá gửi trong bưu gửi EMS vận chuyển qua đường hàng không phải tuân theo những quy định về an ninh hàng không.<br />
              </p><br />
              <h3 className="text-xl font-bold">3. Điều kiện nhận gửi bưu gửi đi quốc tế</h3><br />
              <p>
                Ngoài những quy định đối với bưu gửi trong nước, bưu gửi đi quốc tế phải tuân thủ các quy định sau:<br />
                - Vật phẩm, hàng hóa trong bưu gửi phải thực hiện các quy định về xuất khẩu của Nhà nước và điều kiện nhập khẩu vào các nước nhận (căn cứ quy định về hàng hoá và vật phẩm cấm nhập và nhập có điều kiện vào các nước của Việt Nam, Bưu chính nước nhận và Hiệp hội Bưu chính thế giới).<br />
                - Bưu gửi có vật phẩm, hàng hoá để kinh doanh phải có đầy đủ chứng từ theo quy định của pháp luật.<br />
                - Vật phẩm, hàng hoá xuất khẩu, nhập khẩu thuộc quản lý chuyên ngành phải thực hiện theo quy định của cơ quan quản lý chuyên ngành có thẩm quyền và theo thông báo của Hiệp hội Bưu chính thế giới.<br />
                - Vật phẩm, hàng hoá gửi trong bưu gửi EMS vận chuyển qua đường hàng không phải tuân theo những quy định về an ninh hàng không. Các nội dung hàng hóa có chứa chất bột hoặc chất lỏng phải kèm theo MSDS để kiểm tra điều kiện, khả năng chấp nhận theo quy định.<br />
              </p><br />
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HomepageTabs;

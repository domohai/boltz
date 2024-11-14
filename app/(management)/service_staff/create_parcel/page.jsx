"use client";
import { useParcel, ParcelProvider } from '@components/parcel/ParcelContext';
import ContactInfoForm from '@components/parcel/ContactInfoForm';
import { useState, useMemo } from 'react';
import { Input } from "@nextui-org/input";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { addresses } from './addresses';

const AddressForm = ({ title }) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  // Get list of provinces
  const provinces = useMemo(() => Object.keys(addresses), []);

  // Get districts based on selected province
  const districts = useMemo(() => {
    if (!selectedProvince) return [];
    return Object.keys(addresses[selectedProvince]?.districts || {});
  }, [selectedProvince]);

  // Get wards based on selected province and district
  const wards = useMemo(() => {
    if (!selectedProvince || !selectedDistrict) return [];
    return addresses[selectedProvince]?.districts[selectedDistrict]?.wards || [];
  }, [selectedProvince, selectedDistrict]);

  // Handle province selection
  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedDistrict("");
    setSelectedWard("");
  };

  // Handle district selection
  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedWard("");
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg">
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        <Input type="text" label="Họ tên" placeholder="Nhập họ tên" />
        <Input type="tel" label="Số điện thoại" placeholder="Nhập số điện thoại" />
        <Input className="col-span-2" type="text" label="Địa chỉ" placeholder="Số nhà/tên đường..." />
        
        <Autocomplete
          label="Tỉnh/thành phố"
          placeholder="Chọn tỉnh/thành phố"
          selectedKey={selectedProvince}
          onSelectionChange={handleProvinceChange}
          className="w-full"
        >
          {provinces.map((province) => (
            <AutocompleteItem key={province} value={province}>
              {province}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        <Autocomplete
          label="Huyện/quận"
          placeholder="Chọn huyện/quận"
          selectedKey={selectedDistrict}
          onSelectionChange={handleDistrictChange}
          isDisabled={!selectedProvince}
          className="w-full"
        >
          {districts.map((district) => (
            <AutocompleteItem key={district} value={district}>
              {district}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        <Autocomplete
          label="Xã/phường"
          placeholder="Chọn xã/phường"
          selectedKey={selectedWard}
          onSelectionChange={setSelectedWard}
          isDisabled={!selectedDistrict}
          className="w-full"
        >
          {wards.map((ward) => (
            <AutocompleteItem key={ward} value={ward}>
              {ward}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        <Input type="text" label="Thôn/xóm" placeholder="Nhập thôn/xóm" />
      </div>
    </div>
  );
};

const CreateParcel = () => {



  return (
    <ParcelProvider>
      <div className="w-full p-1 bg-white min-h-screen">
        {/* title */}
        <div className="pt-2 pl-4 flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-black">Tạo bưu gửi</h1>
        </div>
        {/* layout form */}
        <div className="px-2 grid grid-cols-2 gap-2">
          {/* col 1 */}
          <div className="space-y-2">
            <ContactInfoForm type="sender" />
            <ContactInfoForm type="receiver" />
          </div>
          {/* col 2 */}
          <div className="bg-gray-200 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-4">Thông tin dịch vụ - hàng hoá</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="font-medium">Loại hàng hoá:</div>
                <RadioGroup defaultValue="package">
                  <div className="flex gap-4">
                    <Radio value="package">Bưu kiện</Radio>
                    <Radio value="document">Tài liệu</Radio>
                  </div>
                </RadioGroup>
              </div>
              
              <Input type="text" label="Tên hàng" placeholder="Nhập tên hàng" />
              
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" label="Số lượng" placeholder="Nhập số lượng" />
                <Input type="number" label="Trọng lượng" placeholder="Nhập trọng lượng" />
              </div>

              <div>
                <div className="font-medium mb-2">Loại dịch vụ:</div>
                <RadioGroup defaultValue="express">
                  <div className="flex gap-4">
                    <Radio value="express">Chuyển phát nhanh</Radio>
                    <Radio value="urgent">Hỏa tốc</Radio>
                    <Radio value="saving">Tiết kiệm</Radio>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <div className="font-medium mb-2">Kích thước (nếu có):</div>
                <div className="grid grid-cols-3 gap-4">
                  <Input type="number" label="Dài (cm)" placeholder="Nhập chiều dài" />
                  <Input type="number" label="Rộng (cm)" placeholder="Nhập chiều rộng" />
                  <Input type="number" label="Cao (cm)" placeholder="Nhập chiều cao" />
                </div>
              </div>

              <Textarea label="Ghi chú" placeholder="Nhập ghi chú" />
            </div>
          </div>
        </div>
      </div>
    </ParcelProvider>
  );
};

export default CreateParcel;
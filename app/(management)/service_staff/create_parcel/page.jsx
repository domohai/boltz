"use client";
import React, { useState, useMemo } from 'react';
import { NextUIProvider } from "@nextui-org/react";
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

const Page = () => {
  return (
    <NextUIProvider>
      <div className="w-full p-6 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-black">Tạo bưu gửi</h1>
        </div>

        <div className="px-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-4">
              <AddressForm title="Người gửi" />
              <AddressForm title="Người nhận" />
            </div>
            
            <div className="bg-gray-200 p-6 rounded-lg">
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

            <div className="bg-gray-200 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4">Thông tin thanh toán</h3>
              <div className="space-y-4">
                <Input type="text" label="Tổng cước" placeholder="0 VNĐ" />
                
                <div>
                  <div className="font-medium mb-2">Người trả cước:</div>
                  <RadioGroup defaultValue="sender">
                    <Radio value="sender">Người gửi</Radio>
                    <Radio value="receiver">Người nhận</Radio>
                  </RadioGroup>
                </div>

                <div>
                  <div className="font-medium mb-2">Yêu cầu khi giao:</div>
                  <RadioGroup defaultValue="show">
                    <Radio value="show">Cho xem hàng</Radio>
                    <Radio value="noshow">Không cho xem hàng</Radio>
                  </RadioGroup>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-8">
                <Button className="min-w-[200px] bg-yellow-400">
                  Tạo
                </Button>
                <Button className="min-w-[200px] bg-yellow-400">
                  Làm mới
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
};

export default Page;
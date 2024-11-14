"use client";
import { useParcel } from '@components/parcel/ParcelContext';
import { useState, useEffect, useMemo } from 'react';
import { Input } from '@nextui-org/input';
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

const ContactInfoForm = ({ type }) => {
  const { sender, receiver, updateSender, updateReceiver } = useParcel();
  const personData = type === 'sender' ? sender : receiver;
  const updatePerson = type === 'sender' ? updateSender : updateReceiver;
  const size = "sm";
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [cityList, setCityList] = useState([{id: "", city: ""}]);
  const [districtList, setDistrictList] = useState([]);
  
  const districts = useMemo(() => {
    if (!selectedCity) return [];
    return cityList[selectedCity]?.districts || [];
  }, [selectedCity]);

  const getCityList = async () => {
    try {
      const res = await fetch('/api/service_staff/warehouse', {
        method: 'GET',
      });
      const data = await res.json();
      if (data.ok) {
        setCityList(data.cityList);
      } else {
        console.log(data.message);
        alert("An error occurred while getting cityList! See console for more details.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while getting cityList! See console for more details.");
    }
  }

  useEffect(() => {
    getCityList();
  }, []);

  return (
    <div className="bg-gray-200 p-2 rounded">
      <h3 className="font-bold text-base mb-2 ml-1">{type === 'sender' ? "Người gửi" : "Người nhận"}</h3>
      <div className='grid grid-cols-2 gap-2'>
        <Input
          isRequired
          label="Họ tên"
          value={personData.name}
          onChange={(e) => updatePerson({ name: e.target.value })}
          size={size} />
        <Input
          isRequired
          label="Điện thoại"
          value={personData.phone_number}
          onChange={(e) => updatePerson({ phone_number: e.target.value })}
          size={size} />
        <Autocomplete 
          label="Tỉnh/Thành phố"
          placeholder='Chọn tỉnh/thành phố'
          defaultItems={cityList}
          selectedKey={selectedCity}
          onSelectionChange={setSelectedCity}>
          {(item) => (
            <AutocompleteItem key={item.id} textValue={item.city}>
              {item.city}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
    </div>
  )
}

export default ContactInfoForm;
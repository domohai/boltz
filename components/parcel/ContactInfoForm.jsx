"use client";
import { useParcel } from '@components/parcel/ParcelContext';
import { useState, useEffect, useMemo } from 'react';
import { Input } from '@nextui-org/input';
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

const ContactInfoForm = ({ type }) => {
  const { sender, receiver, updateSender, updateReceiver, parcelInfo, updateParcelInfo } = useParcel();
  const personData = type === 'sender' ? sender : receiver;
  const updatePerson = type === 'sender' ? updateSender : updateReceiver;
  const size = "sm";
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSpId, setSelectedSpId] = useState("");
  const [cityDistrictMap, setCityDistrictMap] = useState({});
  
  const districts = useMemo(() => {
    if (!selectedCity || !cityDistrictMap[selectedCity]) return [];
    const _districts = cityDistrictMap[selectedCity];
    // Use a Set to track unique district names
    const seenDistricts = new Set();
    return _districts.filter(({ district }) => {
      if (seenDistricts.has(district)) {
        return false; // Skip duplicates
      }
      seenDistricts.add(district);
      return true;
    });
  }, [selectedCity]);

  const servicePoints = useMemo(() => {
    if (!selectedCity || !selectedDistrict || !cityDistrictMap[selectedCity]) return [];
    return cityDistrictMap[selectedCity].filter(({ district }) => district === selectedDistrict);
  }, [selectedDistrict, selectedCity]);

  const handleUpdateParcelInfo = (key) => {
    setSelectedSpId(key); // Update selected service point ID
    // Find the selected service point object in the current city's districts
    const selectedSp = servicePoints.find((sp) => sp.id === Number(key));
    if (selectedSp) {
      const {collection_point_id} = selectedSp; // Get collection point ID from selected service point
      // Update parcelInfo with selected service point and collection point IDs
      if (type === 'sender') {
        updateParcelInfo({ src_service_p: key, src_collection_p: String(collection_point_id) });
      } else {
        updateParcelInfo({ des_service_p: key, des_collection_p: String(collection_point_id) });
      }
    } else {
      console.error("Service point not found for the selected key.");
    }
  }; 

  const getServicePoints = async () => {
    try {
      const res = await fetch('/api/service_staff/warehouse', {
        method: 'GET',
      });
      const data = await res.json();
      if (data.ok) {
        // Transform data into a city-district map with address and id
        const map = data.servicePoints.reduce((acc, servicePoint) => {
          const { city, district, address, id, collection_point_id } = servicePoint;
          // Initialize the array for a new city if not already done
          if (!acc[city]) {
            acc[city] = [];
          }
          // Add the district with address and id to the city's list
          acc[city].push({ id, district, address, collection_point_id });
          return acc;
        }, {});
        setCityDistrictMap(map);
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
    getServicePoints();
  }, []);

  return (
    <Card fullWidth className="bg-gray-200" radius='sm'>
      <CardHeader className='bg-gray-300 p-2 pl-3'>
        <Image radius='none' src={type === 'sender' ? '/assets/icons/sender.svg' : '/assets/icons/receiver.svg'} width={20} height={20} />
        <h3 className="font-medium text-base ml-1">{type === 'sender' ? "Người gửi" : "Người nhận"}</h3>
      </CardHeader>
      <CardBody className='grid grid-cols-2 gap-2 p-2'>
        <Input
          isRequired
          isClearable
          label="Họ tên"
          value={personData.name}
          onChange={(e) => updatePerson({ name: e.target.value })}
          onClear={() => updatePerson({ name: "" })}
          size={size} />
        <Input
          isRequired
          isClearable
          label="Điện thoại"
          value={personData.phone_number}
          onChange={(e) => updatePerson({ phone_number: e.target.value })}
          onClear={() => updatePerson({ phone_number: "" })}
          size={size} />
        <Autocomplete
          isRequired
          label="Tỉnh/Thành phố"
          defaultItems={Object.keys(cityDistrictMap).map((city) => ({ key: city, textValue: city }))}
          value={selectedCity}
          onSelectionChange={setSelectedCity}
          size={size}>
          {(item) => (
            <AutocompleteItem key={item.key}>{item.textValue}</AutocompleteItem>
          )}
        </Autocomplete>
        <Autocomplete
          isRequired
          label="Quận/Huyện"
          defaultItems={districts.map((district) => ({ key: district.district, textValue: district.district }))}
          value={selectedDistrict}
          onSelectionChange={setSelectedDistrict}
          size={size}>
          {(item) => (
            <AutocompleteItem key={item.key}>
              {item.textValue}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Autocomplete 
          isRequired
          className='col-span-2'
          label={type === 'sender' ? "Điểm gửi hàng" : "Điểm nhận hàng"}
          defaultItems={servicePoints.map((sp) => ({ key: sp.id, textValue: sp.address }))}
          value={parcelInfo.src_service_p}
          onSelectionChange={handleUpdateParcelInfo}
          size={size}>
          {(item) => (
            <AutocompleteItem key={item.key}>
              {item.textValue}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </CardBody>
    </Card>
  )
}

export default ContactInfoForm;
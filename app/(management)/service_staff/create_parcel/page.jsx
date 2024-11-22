"use client";
import { useParcel, ParcelProvider } from '@components/parcel/ParcelContext';
import ContactInfoForm from '@components/parcel/ContactInfoForm';
import { useMemo, useEffect } from 'react';
import { Input, Textarea } from "@nextui-org/input";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button } from "@nextui-org/button";
import CostUtils from "@utils/CostUtils.js";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

const CreateParcel = () => {
  return (
    <ParcelProvider>
      <CreateParcelContent />
    </ParcelProvider>
  );
};

const CreateParcelContent = () => {
  const { parcelInfo, updateParcelInfo, createParcel, resetAll } = useParcel();
  const cost = useMemo(() => CostUtils.calculateCost(parcelInfo.weight, parcelInfo.type), [parcelInfo.weight, parcelInfo.type]);

  useEffect(() => {
    updateParcelInfo({ cost: cost });
  }, [cost]);

  return (
    <div className="w-full p-1 bg-white min-h-screen">
      {/* title */}
      <div className="pt-2 pl-4 flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">Tạo bưu gửi</h1>
      </div>
      {/* layout form */}
      <form onSubmit={createParcel}>
      <div className="px-2 grid grid-cols-2 gap-2">
        {/* Sender/Receiver */}
        <div className="space-y-2">
          <ContactInfoForm type="sender" />
          <ContactInfoForm type="receiver" />
        </div>
        {/* Package Info */}
        <Card fullWidth className="bg-gray-200" radius='sm'>
          <CardHeader className='bg-gray-300 p-2 pl-3'>
            <Image radius='none' src='/assets/icons/package-1.svg' width={20} height={20} />
            <h3 className="font-medium text-base ml-1">Thông tin dịch vụ - hàng hoá</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-2">
              {/* Package type */}
              <div className="flex flex-col items-start">
                <div className='flex flex-row pb-1'>
                  <Image className='pt-1' src='/assets/icons/package-2.svg' width={26} height={26} />
                  <h3 className='font-medium ml-1'>Loại hàng hoá</h3>
                </div>
                <RadioGroup  
                  className='space-x-2 my-1 ml-2'
                  value={parcelInfo.type}
                  onChange={(e) => updateParcelInfo({ type: e.target.value })}
                  size='sm'
                  orientation='horizontal'>
                  <Radio className='px-4' value="package">Bưu kiện</Radio>
                  <Radio className='px-4' value="docs">Tài liệu</Radio>
                </RadioGroup>
              </div>
              <Divider />
              {/* Package name, weight */}
              <Input 
                isRequired
                className=''
                value={parcelInfo.name}
                onChange={(e) => updateParcelInfo({ name: e.target.value })} 
                type="text" 
                label="Tên hàng" 
                size='sm'/>
              <div className='grid grid-cols-2 gap-1'> 
                <Input 
                  className='col-span-1' 
                  type="number" 
                  label="Trọng lượng (g)"
                  value={parcelInfo.weight}
                  onChange={(e) => updateParcelInfo({ weight: e.target.value })} 
                  size='sm'
                  radius='sm'
                  startContent={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#6b7280" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                    </svg>
                  }/>
                <Input 
                  className='col-span-1' 
                  type="number" 
                  label="Giá trị hàng (đ)" 
                  value={parcelInfo.value}
                  onChange={(e) => updateParcelInfo({ value: e.target.value })}
                  size='sm'
                  radius='sm'
                  startContent={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#6b7280" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  }/>
              </div>
              <Divider />
              {/* Calculated cost */}
              <div className='grid grid-cols-2 gap-4 font-medium'>
                <div className=''>Tổng cước vận chuyển: </div>
                <div className='justify-self-end mr-3 text-red-500'>{cost + 'đ'}</div>
              </div>
              <Divider />
              <Textarea 
                value={parcelInfo.notes}
                onChange={(e) => updateParcelInfo({ notes: e.target.value })}
                labelPlacement='outside'
                label="Ghi chú" 
                placeholder="Nhập ghi chú" />
            </div>
            <div>
              <Button 
                className='w-full mt-2' 
                 
                type='submit'
                size='sm' 
                color='primary'>
                Tạo bưu gửi
              </Button>
              <Button 
                className='w-full mt-2' 
                onPress={resetAll} 
                size='sm'>
                Làm mới
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      </form>
    </div>
  );
};

export default CreateParcel;
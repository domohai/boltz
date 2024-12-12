"use client";
import { Button } from "@nextui-org/button";
// import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import Link from "next/link";

const ServiceStaffSidebar = () => {
  return (
    <div>
      <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý đơn hàng</h3>
      <Button 
        as={Link} 
        href="/service_staff" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/truck.svg" width={26} height={26}/>}
        radius="none">
        Đơn hàng chờ vận chuyển
      </Button>
      <Button 
        as={Link} 
        href="/service_staff/confirm" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/confirm_parcel.svg" width={26} height={26}/>}
        radius="none">
        Đơn hàng chờ xác nhận
      </Button>
      <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý bưu gửi</h3>
      <Button 
        as={Link} 
        href="/service_staff/create_parcel" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/create.svg" width={26} height={26}/>}
        radius="none">
        Tạo bưu gửi
      </Button>
      <Button 
        as={Link} 
        href="/service_staff/waiting_parcel" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/waiting_parcel.svg" width={26} height={26}/>}
        radius="none">
        Bưu gửi chờ trả
      </Button>
    </div>
  )
}

export default ServiceStaffSidebar;
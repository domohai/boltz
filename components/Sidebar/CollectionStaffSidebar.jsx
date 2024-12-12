"use client";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import Link from "next/link";

const CollectionStaffSidebar = () => {
  return (
    <div>
      <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý đơn hàng</h3>
      <Button 
        as={Link} 
        href="/collection_staff" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/truck.svg" width={26} height={26}/>}
        radius="none">
        Đơn hàng chờ vận chuyển
      </Button>
      <Button 
        as={Link} 
        href="/collection_staff/confirm" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/confirm_parcel.svg" width={26} height={26}/>}
        radius="none">
        Đơn hàng chờ xác nhận
      </Button>
    </div>
  )
}

export default CollectionStaffSidebar;
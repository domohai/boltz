"use client";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";

const ServiceManagerSidebar = () => {
  return (
    <div>
      <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Thống kê</h3>
      <Button 
        as={Link} 
        href="/service_manager"
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/chart_icon.svg" width={26} height={26}/>}
        radius="none">
        Thống kê
      </Button>
      <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý tài khoản</h3>
      <Button 
        as={Link} 
        href="/service_manager/manage_accounts" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/users_icon.svg" width={26} height={26}/>}
        radius="none">
        Quản lý tài khoản
      </Button>
    </div>
  )
}

export default ServiceManagerSidebar;
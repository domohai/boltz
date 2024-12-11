"use client";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Image } from "@nextui-org/image";

const LeaderSidebar = () => {
  return (
    <div>
      <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Thống kê</h3>
      <Button 
        as={Link} 
        href="/leader" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/chart_icon.svg" width={26} height={26}/>}
        radius="none">
        Thống kê
      </Button>
      <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý kho bãi</h3>
      <Accordion isCompact fullWidth>
        <AccordionItem 
          isCompact
          title={<div className="text-sm text-gray-700">Quản lý kho bãi</div>}
          className="pl-2 w-full"
          startContent={<Image src="/assets/icons/house_icon.svg" width={26} height={26}/>}>
          <Button 
            as={Link} 
            href="/leader/manage_warehouse" 
            className="w-full justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
            radius="none">
            Điểm tập kết
          </Button>
          <Button 
            as={Link} 
            href="/leader/manage_warehouse/service_point" 
            className="w-full justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
            radius="none">
            Điểm giao dịch
          </Button>
        </AccordionItem>
      </Accordion>
      
      <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý tài khoản</h3>
      <Button 
        as={Link} 
        href="/leader/manage_accounts" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/users_icon.svg" width={26} height={26}/>}
        radius="none">
        Quản lý tài khoản
      </Button>
    </div>
  )
}

export default LeaderSidebar;
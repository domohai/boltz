'use client';
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { useSession } from "next-auth/react";
import { ROLES } from "@utils/roles.js";

const Sidebar = () => {
  const {data: session, status} = useSession();
  const role = session?.user?.role;

  const leaderContent = (
    <>
      <Button 
        as={Link} 
        href="/leader" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="assets/icons/chart_icon.svg" width={30} height={30}/>}
        radius="none">
        Thống kê
      </Button>
      <Button 
        as={Link} 
        href="/leader/manage_warehouse" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/house_icon.svg" width={30} height={30}/>}
        radius="none">
        Quản lý kho bãi
      </Button>
      <Button 
        as={Link} 
        href="/leader/manage_accounts" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/users_icon.svg" width={30} height={30}/>}
        radius="none">
        Quản lý tài khoản
      </Button>
    </>
  );

  const collectionManagerContent = (
    <>
      <Button 
        as={Link} 
        href="/collection_manager" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/chart_icon.svg" width={30} height={30}/>}
        radius="none">
        Thống kê
      </Button>
      <Button 
        as={Link} 
        href="/collection_manager/manage_accounts" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/users_icon.svg" width={30} height={30}/>}
        radius="none">
        Quản lý tài khoản
      </Button>
    </>
  );

  const servicePointManagerContent = (
    <>
      <Button 
        as={Link} 
        href="/service_manager"
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/chart_icon.svg" width={30} height={30}/>}
        radius="none">
        Thống kê
      </Button>
      <Button 
        as={Link} 
        href="/service_manager/manage_accounts" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/users_icon.svg" width={30} height={30}/>}
        radius="none">
        Quản lý tài khoản
      </Button>
    </>
  );

  const collectionStaffContent = (
    <>
      <Button 
        as={Link} 
        href="/collection_staff" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/truck.svg" width={30} height={30}/>}
        radius="none">
        Đơn hàng chờ vận chuyển
      </Button>
      <Button 
        as={Link} 
        href="/collection_staff/confirm" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/confirm_parcel.svg" width={30} height={30}/>}
        radius="none">
        Đơn hàng chờ xác nhận
      </Button>
    </>
  );

  const serviceStaffContent = (
    <>
      <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý đơn hàng</h3>
      <Button 
        as={Link} 
        href="/service_staff" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/truck.svg" width={30} height={30}/>}
        radius="none">
        Đơn hàng chờ vận chuyển
      </Button>
      <Button 
        as={Link} 
        href="/service_staff/confirm" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/confirm_parcel.svg" width={30} height={30}/>}
        radius="none">
        Đơn hàng chờ xác nhận
      </Button>
      <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý bưu gửi</h3>
      <Button 
        as={Link} 
        href="/service_staff/create_parcel" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/confirm_parcel.svg" width={30} height={30}/>}
        radius="none">
        Tạo bưu gửi
      </Button>
      <Button 
        as={Link} 
        href="/service_staff/waiting_parcel" 
        className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
        startContent={<Image src="/assets/icons/confirm_parcel.svg" width={30} height={30}/>}
        radius="none">
        Bưu gửi chờ trả
      </Button>
    </>
  );

  const getSidebarContent = () => {
    switch (role) {
      case ROLES.LEADER:
        return leaderContent;
      case ROLES.COLLECTION_MANAGER:
        return collectionManagerContent;
      case ROLES.SERVICE_MANAGER:
        return servicePointManagerContent;
      case ROLES.COLLECTION_STAFF:
        return collectionStaffContent;
      case ROLES.SERVICE_STAFF:
        return serviceStaffContent;
      default:
        return (<h1>Unknown role in Sidebar.jsx: {role}</h1>);
    }
  };

  return (
    <div className="bg-[#f0f0f2] h-full top-0 left-0 flex flex-col">
      {getSidebarContent()}
    </div>
  );
};

export default Sidebar;
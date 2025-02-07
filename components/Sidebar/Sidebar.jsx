"use client";
import { useSession } from "next-auth/react";
import { ROLES } from "@utils/roles.js";
import { useMemo } from "react";
import LeaderSidebar from "@components/Sidebar/LeaderSidebar.jsx";
import CollectionManagerSidebar from "@components/Sidebar/CollectionManagerSidebar.jsx";
import ServiceManagerSidebar from "@components/Sidebar/ServiceManagerSidebar.jsx";
import CollectionStaffSidebar from "@components/Sidebar/CollectionStaffSidebar.jsx";
import ServiceStaffSidebar from "@components/Sidebar/ServiceStaffSidebar.jsx";
import { useSessionData } from "@components/SessionContext.js";

const Sidebar = () => {
  // const { session, status } = useSessionData();
  const { data: session, status } = useSession({ required: true });
  const role = useMemo(() => session?.user.role, [session, status]);

  const content = useMemo(() => {
    switch (session?.user?.role) {
      case ROLES.LEADER:
        return <LeaderSidebar />;
      case ROLES.COLLECTION_MANAGER:
        return <CollectionManagerSidebar />;
      case ROLES.SERVICE_MANAGER:
        return <ServiceManagerSidebar />;
      case ROLES.COLLECTION_STAFF:
        return <CollectionStaffSidebar />;
      case ROLES.SERVICE_STAFF:
        return <ServiceStaffSidebar />;
      default:
        return <h1>Loading...</h1>;
    }
  }, [role, session, status]);

  // const leaderContent = (
  //   <>
  //     <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Thống kê</h3>
  //     <Button 
  //       as={Link} 
  //       href="/leader" 
  //       className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
  //       startContent={<Image src="/assets/icons/chart_icon.svg" width={26} height={26}/>}
  //       radius="none">
  //       Thống kê
  //     </Button>
  //     <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý kho bãi</h3>
  //     <Accordion isCompact fullWidth>
  //       <AccordionItem 
  //         isCompact
  //         title={<div className="text-sm text-gray-700">Quản lý kho bãi</div>}
  //         className="pl-2 w-full"
  //         startContent={<Image src="/assets/icons/house_icon.svg" width={26} height={26}/>}>
  //         <Button 
  //           as={Link} 
  //           href="/leader/manage_warehouse" 
  //           className="w-full justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
  //           radius="none">
  //           Điểm tập kết
  //         </Button>
  //         <Button 
  //           as={Link} 
  //           href="/leader/manage_warehouse/service_point" 
  //           className="w-full justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
  //           radius="none">
  //           Điểm giao dịch
  //         </Button>
  //       </AccordionItem>
  //     </Accordion>
      
  //     <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý tài khoản</h3>
  //     <Button 
  //       as={Link} 
  //       href="/leader/manage_accounts" 
  //       className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
  //       startContent={<Image src="/assets/icons/users_icon.svg" width={26} height={26}/>}
  //       radius="none">
  //       Quản lý tài khoản
  //     </Button>
  //   </>
  // );

  // const collectionManagerContent = (
  //   <>
  //     <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Thống kê</h3>
  //     <Button 
  //       as={Link} 
  //       href="/collection_manager" 
  //       className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
  //       startContent={<Image src="/assets/icons/chart_icon.svg" width={26} height={26}/>}
  //       radius="none">
  //       Thống kê
  //     </Button>
  //     <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý tài khoản</h3>
  //     <Button 
  //       as={Link} 
  //       href="/collection_manager/manage_accounts" 
  //       className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
  //       startContent={<Image src="/assets/icons/users_icon.svg" width={26} height={26}/>}
  //       radius="none">
  //       Quản lý tài khoản
  //     </Button>
  //   </>
  // );

  // const servicePointManagerContent = (
  //   <>
  //     <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Thống kê</h3>
  //     <Button 
  //       as={Link} 
  //       href="/service_manager"
  //       className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
  //       startContent={<Image src="/assets/icons/chart_icon.svg" width={26} height={26}/>}
  //       radius="none">
  //       Thống kê
  //     </Button>
  //     <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý tài khoản</h3>
  //     <Button 
  //       as={Link} 
  //       href="/service_manager/manage_accounts" 
  //       className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
  //       startContent={<Image src="/assets/icons/users_icon.svg" width={26} height={26}/>}
  //       radius="none">
  //       Quản lý tài khoản
  //     </Button>
  //   </>
  // );

  // const collectionStaffContent = (
  //   <>
  //     <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý đơn hàng</h3>
  //     <Button 
  //       as={Link} 
  //       href="/collection_staff" 
  //       className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
  //       startContent={<Image src="/assets/icons/truck.svg" width={26} height={26}/>}
  //       radius="none">
  //       Đơn hàng chờ vận chuyển
  //     </Button>
  //     <Button 
  //       as={Link} 
  //       href="/collection_staff/confirm" 
  //       className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
  //       startContent={<Image src="/assets/icons/confirm_parcel.svg" width={26} height={26}/>}
  //       radius="none">
  //       Đơn hàng chờ xác nhận
  //     </Button>
  //   </>
  // );

  // const serviceStaffContent = (
  //   <>
  //     <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý đơn hàng</h3>
  //     <Button 
  //       as={Link} 
  //       href="/service_staff" 
  //       className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
  //       startContent={<Image src="/assets/icons/truck.svg" width={26} height={26}/>}
  //       radius="none">
  //       Đơn hàng chờ vận chuyển
  //     </Button>
  //     <Button 
  //       as={Link} 
  //       href="/service_staff/confirm" 
  //       className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
  //       startContent={<Image src="/assets/icons/confirm_parcel.svg" width={26} height={26}/>}
  //       radius="none">
  //       Đơn hàng chờ xác nhận
  //     </Button>
  //     <h3 className="mt-2 ml-2 text-xs text-gray-700 font-semibold">Quản lý bưu gửi</h3>
  //     <Button 
  //       as={Link} 
  //       href="/service_staff/create_parcel" 
  //       className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
  //       startContent={<Image src="/assets/icons/create.svg" width={26} height={26}/>}
  //       radius="none">
  //       Tạo bưu gửi
  //     </Button>
  //     <Button 
  //       as={Link} 
  //       href="/service_staff/waiting_parcel" 
  //       className="justify-start bg-transparent hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition-colors duration-200 ease-in-out" 
  //       startContent={<Image src="/assets/icons/waiting_parcel.svg" width={26} height={26}/>}
  //       radius="none">
  //       Bưu gửi chờ trả
  //     </Button>
  //   </>
  // );

  return (
    <div className="bg-[#f0f0f2] h-full top-0 left-0 flex flex-col">
      {content}
    </div>
  );
};

export default Sidebar;
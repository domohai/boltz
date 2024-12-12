"use client";
import ManagementNav from "@components/ManagementNav";
import { useSession } from "next-auth/react";
import { ROLES } from "@utils/roles.js";
import { useMemo } from "react";
import LeaderSidebar from "@components/Sidebar/LeaderSidebar.jsx";
import CollectionManagerSidebar from "@components/Sidebar/CollectionManagerSidebar.jsx";
import ServiceManagerSidebar from "@components/Sidebar/ServiceManagerSidebar.jsx";
import CollectionStaffSidebar from "@components/Sidebar/CollectionStaffSidebar.jsx";
import ServiceStaffSidebar from "@components/Sidebar/ServiceStaffSidebar.jsx";
import Sidebar from "@components/Sidebar/Sidebar.jsx";

const ManagementLayout = ({ children }) => {
  const { data: session, status: sessionStatus } = useSession({ required: true });
  const role = useMemo(() => session?.user.role, [session, sessionStatus]);

  const sidebar = useMemo(() => {
    switch (role) {
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
  });

  return (
    <section className="grid grid-cols-5">
      {/* Minh Hải */}
      {/* Giao diện chung cho các staff */}
      {/* Nav */}
      <div className="col-span-5">
        <ManagementNav/>
      </div>
      {/* Sidebar */}
      <div className="h-full min-h-screen col-span-1 bg-[#f0f0f2] top-0 left-0 flex flex-col">
        { sidebar }
        {/* <Sidebar /> */}
      </div>
      {/* Content */}
      <div className="col-span-4">
        { children }
      </div>
    </section>
  )
}

export default ManagementLayout;
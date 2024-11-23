import ManagementNav from "@components/ManagementNav";
import Sidebar from "@components/Sidebar";

const ManagementLayout = ({ children }) => {
  return (
    <section className="grid grid-cols-5">
      {/* Minh Hải */}
      {/* Giao diện chung cho các staff */}
      {/* Nav */}
      <div className="col-span-5">
        <ManagementNav/>
      </div>
      {/* Sidebar */}
      <div className="h-full min-h-screen col-span-1">
        <Sidebar/>
      </div>
      {/* Content */}
      <div className="col-span-4">
        { children }
      </div>
    </section>
  )
}

export default ManagementLayout;
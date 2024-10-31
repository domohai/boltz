import ManagementNav from "@components/ManagementNav";
import Sidebar from "@components/Sidebar";

const ManagementLayout = ({ children }) => {
  return (
    <section className="grid grid-cols-4">
      {/* Minh Hải */}
      {/* Giao diện chung cho các staff */}
      {/* Nav */}
      <div className="col-span-4">
        <ManagementNav/>
      </div>
      {/* Sidebar */}
      <div className="h-full min-h-screen">
        <Sidebar/>
      </div>
      {/* Content */}
      <div className="col-span-3">
        { children }
      </div>
    </section>
  )
}

export default ManagementLayout;
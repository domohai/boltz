import ManagementNav from "@components/ManagementComps/ManagementNav";
import Sidebar from "@components/ManagementComps/Sidebar";

const ManagementLayout = ({ children }) => {
  return (
    <section>
      {/* Minh Hải */}
      {/* Giao diện chung cho các staff */}
      <ManagementNav/>
      {/* Sidebar */}
      <div className="flex flex-row flex-grow">
        <div className="w-1/4">
          <Sidebar/>
        </div>
        <div className="w-3/4 p-4">
          { children }
        </div>
      </div>
    </section>
  )
}

export default ManagementLayout;
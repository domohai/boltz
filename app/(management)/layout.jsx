import ManagementNav from "@components/ManagementComp/ManagementNav";

const ManagementLayout = ({ children }) => {
  return (
    <div>
      <ManagementNav/>
      { children }
      {/* Minh Hải */}
      {/* Giao diện chung cho các staff */}
      
    </div>
  )
}

export default ManagementLayout;
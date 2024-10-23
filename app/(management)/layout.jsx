import ManagementNav from "@components/ManagementComp/ManagementNav";

const ManagementLayout = ({ children }) => {
  return (
    <section>
      {/* Minh Hải */}
      {/* Giao diện chung cho các staff */}
      <ManagementNav/>
      
      { children }
      
    </section>
  )
}

export default ManagementLayout;
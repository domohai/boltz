import {  Navbar,   
  NavbarBrand,   
  NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem, Link, Button} 
  from "@nextui-org/react";

const Nav = () => {
  return (
    <Navbar>
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <img src="/assets/images/logo_BoltZ.png" alt="BoltZ Logo" style={{ height: '92px', }}/>
        <p className="font-bold text-inherit">BoltZ</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Dịch vụ
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Tra cứu
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Liên hệ
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Tạo bưu gửi</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Đăng nhập
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

// const AcmeLogo = () => (
//   <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
//     <path
//       clipRule="evenodd"
//       d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
//       fill="currentColor"
//       fillRule="evenodd"
//     />
//   </svg>
// );

export default Nav
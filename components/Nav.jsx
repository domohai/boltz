import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import Image from 'next/image';

const Nav = () => {
  return (
    <Navbar className="bg-white shadow-md">
      <NavbarBrand className="flex items-center space-x-2">
        <Link href="#">
          <Image src="/assets/images/logo_BoltZ.png" alt="BoltZ Logo" width={92} height={92} />
          <p className="font-bold text-xl text-gray-800">BoltZ</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 justify-center">
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


export default Nav
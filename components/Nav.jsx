import { Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle, 
  NavbarMenu, 
  NavbarMenuItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Image } from '@nextui-org/image';

const Nav = () => {
  return (
    <Navbar className="w-full bg-white shadow-md" maxWidth={'full'}>
      <NavbarBrand className="flex items-center space-x-2">
        <Link href="/">
          <Image src="/assets/images/logo_BoltZ.png" alt="BoltZ Logo" width={92} height={92} />
          <p className="font-bold text-xl text-gray-800">BoltZ</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-5" justify-="end">
        <NavbarItem>
          <Link color="foreground" href="#">
            Dịch vụ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
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

      {/* MHai test */}
        <NavbarItem>
          <Button as={Link} color="primary" href="/Leader" variant="flat">
            Tạo bưu gửi
          </Button>
        </NavbarItem>
      {/* MHai test */}

        <NavbarItem>
          <Button as={Link} color="primary" href="/login" variant="flat">
            Đăng nhập
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}


export default Nav
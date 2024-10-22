'use client';
import {  Navbar,   
  NavbarBrand,   
  NavbarContent,   
  NavbarItem,   
  NavbarMenuToggle,  
  NavbarMenu,  
  NavbarMenuItem} from "@nextui-org/navbar";
import {Avatar, AvatarIcon} from "@nextui-org/avatar";
import {Image} from "@nextui-org/image";
import {useState} from "react";

const ManagementNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const role = "Leader";
  return (
    <div>
      <Navbar maxWidth={'full'} className=" bg-[#2d8bba] shadow-md">
        <NavbarBrand>
          <Image src="./assets/images/logo_BoltZ.png" alt="BoltZ logo" 
                width="80" height="80" />
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem>
            {role}
          </NavbarItem>
          <NavbarItem>
          
            
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  )
}

export default ManagementNav;
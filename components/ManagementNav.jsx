'use client';
import {Image} from "@nextui-org/image";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/modal";
import {Navbar, NavbarContent, NavbarBrand, NavbarItem} from "@nextui-org/navbar";
import {Avatar, AvatarIcon} from "@nextui-org/avatar";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/dropdown";
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/link";
import {useSession, signOut} from "next-auth/react";
import { useRouter } from 'next/navigation'

const ManagementNav = () => {
  const {data: session, status} = useSession();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
  }

  return (
    <div>
      <Navbar position="static" maxWidth={'full'} className=" bg-[#2d8bba] shadow-md">
        <Logo />
        <NavbarContent justify="end">
          <NavbarItem>
            {session?.user?.name ? session?.user?.name : session?.user?.role}
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  icon={<AvatarIcon/>}
                  as="button"
                  size="sm"
                  isBordered
                  color="default"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="settings" onPress={onOpen}>
                  Cài đặt tài khoản
                </DropdownItem>
                <DropdownItem 
                  onPress={handleLogout} 
                  key="logout" color="danger">
                  Đăng xuất
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Thông tin tài khoản</ModalHeader>
              <ModalBody>
                <p>Name: {session.user.name}</p>
                <p>Email: {session.user.email}</p>
                <p>Role: {session.user.role}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

const Logo = () => {
  return (
    <NavbarBrand>
      <Link href="/">
        <Image src="/assets/images/logo_BoltZ.png" alt="BoltZ logo" width="100" height="80" />
      </Link>
    </NavbarBrand>
  )
}

export default ManagementNav;
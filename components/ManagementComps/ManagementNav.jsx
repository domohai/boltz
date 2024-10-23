'use client';
import {Image, Avatar, AvatarIcon, Modal, ModalContent, ModalHeader, Navbar, 
        Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
        NavbarBrand, NavbarContent, NavbarItem, Button, Link,
        ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

const ManagementNav = () => {
  const role = "Leader";
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div>
      <Navbar maxWidth={'full'} className=" bg-[#2d8bba] shadow-md">
        <Logo />

        <NavbarContent justify="end">
          <NavbarItem>
            {role}
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
                <DropdownItem key="logout" color="danger" href="/">
                  Log Out
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
                <p>Username: </p>
                <p>Email: </p>
                <p>Role: </p>
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
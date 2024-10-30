'use client';
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

const Sidebar = () => {
  return (
    <div className="bg-[#f0f0f2] h-full top-0 left-0 flex flex-col">
      <Accordion selectionMode="multiple">
        <AccordionItem title="Leader">
          <div className="flex flex-col">
            <Button as={Link} href="/leader/dashboard" className="text-left p-2 hover:bg-gray-200 rounded">Thống kê</Button>
            <Button as={Link} href="/leader/manage_warehouse" className="text-left p-2 hover:bg-gray-200 rounded">Quản lý kho bãi</Button>
            <Button as={Link} href="/leader/manage_accounts" className="text-left p-2 hover:bg-gray-200 rounded">Quản lý tài khoản</Button>
          </div>
        </AccordionItem>

        <AccordionItem title="Collection Manager">
          <div className="flex flex-col">
            <button className="text-left p-2 hover:bg-gray-200 rounded">Sub-item 1</button>
            <button className="text-left p-2 hover:bg-gray-200 rounded">Sub-item 2</button>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Sidebar;
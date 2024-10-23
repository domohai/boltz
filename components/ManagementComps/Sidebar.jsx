'use client';
import { Accordion, AccordionItem, Button, Link } from "@nextui-org/react";

const Sidebar = () => {
  return (
    <div className="bg-[#f0f0f2] w-1/4 h-screen fixed top-0 left-0 p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Sidebar Menu</h2>
      
      {/* Accordion from NextUI */}
      <Accordion>
        <AccordionItem title="Leader">
          <div className="flex flex-col">
            <Button as={Link} href="/leader/manage_warehouse" className="text-left p-2 hover:bg-gray-200 rounded">Quản lý kho bãi</Button>
            <Button as={Link} href="/leader/manage_accounts" className="text-left p-2 hover:bg-gray-200 rounded">Quản lý tài khoản</Button>
          </div>
        </AccordionItem>

        <AccordionItem title="Menu 2">
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
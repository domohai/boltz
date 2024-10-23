"use client";

import {NextUIProvider} from "@nextui-org/system";

const Providers = ({ children }) => {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}

export default Providers
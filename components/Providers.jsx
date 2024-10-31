"use client";

import {NextUIProvider} from "@nextui-org/system";
import {SessionProvider} from "next-auth/react";

const Providers = ({ children }) => {
  return (
    <SessionProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </SessionProvider>
  )
}

export default Providers;
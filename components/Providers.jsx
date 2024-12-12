"use client";
import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider } from "next-auth/react";
import { SessionProvider as MySessionProvider } from "@components/SessionContext.js";

const Providers = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <MySessionProvider>
          {children}
        </MySessionProvider>
      </NextUIProvider>
    </SessionProvider>
  )
}

export default Providers;
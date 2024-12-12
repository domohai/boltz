// contexts/SessionContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [sessionData, setSessionData] = useState({ session: null, status: "loading" });

  useEffect(() => {
    setSessionData({ session, status });
  }, [session, status]);

  return (
    <SessionContext.Provider value={sessionData}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionData = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionData must be used within a SessionProvider");
  }
  return context;
};

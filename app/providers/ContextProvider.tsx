"use client";

import React from "react";
import { GlobalProvider } from "@/app/context/globalProvider";

interface Props {
  children: React.ReactNode;  
}

function ContextProvider({ children }: Props) {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 250);
  }, []);

  return (
    <GlobalProvider>
      {children}
    </GlobalProvider>
  );
}

export default ContextProvider;

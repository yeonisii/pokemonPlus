"use client";

import { useEffect, useState } from "react";
import Providers from "../queryClient/QueryClient";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <Providers>{children}</Providers>;
};

export default ClientProviders;

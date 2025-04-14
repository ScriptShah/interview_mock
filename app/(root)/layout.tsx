import Link from "next/link";
import Image from "next/image";
import React, { ReactNode } from "react";
import { isAuthenticated } from "@/lib/actions/auth.action";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = isAuthenticated;
  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepSmart</h2>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;

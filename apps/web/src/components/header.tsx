"use client";

import Link from "next/link";
import { Bike } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white ">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex items-center gap-2">
          <Bike size={32} />
          <h1 className="text-2xl font-bold font-mono">markus</h1>
        </div>

        <Link
          href="/admin"
          prefetch={true}
          className="text-sm/6 font-semibold text-gray-900"
        >
          Dashboard
        </Link>
      </nav>
    </header>
  );
}

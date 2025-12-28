"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchScrollHandler(): null {
  const searchParams = useSearchParams();

  useEffect(() => {
    const section: string | null = searchParams.get("scroll");
    if (!section) return;

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams]);

  return null;
}

"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
export default function page() {
  useEffect(() => {
    redirect("/letters/inbox");
  }, []);
}

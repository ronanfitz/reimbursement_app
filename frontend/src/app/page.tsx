"use client";

import { NextUIProvider } from "@nextui-org/system";

import HomePage from "./homepage/page";

export default function App() {
  return (
    <NextUIProvider>
      <HomePage />
    </NextUIProvider>
  );
}

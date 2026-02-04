"use client";
import React from "react";
import dynamic from "next/dynamic";

const RapiDoc = dynamic(
  async () => {
    await import("rapidoc");
    return () => <rapi-doc spec-url="/api/rapidoc" />;
  },
  { ssr: false }
);

export default function MyApiDoc() {
  return <RapiDoc />;
}

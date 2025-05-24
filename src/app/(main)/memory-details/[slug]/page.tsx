import React from "react";

export default async function MemoryDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <div>MemoryDetailsPage {slug}</div>;
}

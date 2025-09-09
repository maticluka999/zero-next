"use client";

import { ZeroProvider as ZP, useZero as useZ } from "@rocicorp/zero/react";
import { Zero } from "@rocicorp/zero";
import { schema, Schema } from "./schema";

type Props = {
  children: React.ReactNode;
  token?: string;
  userID?: string;
};

export default function ZeroProvider(props: Props) {
  const { children, userID = "anon" } = props;

  const zero = new Zero({
    schema,
    server: process.env.NEXT_PUBLIC_ZERO_SERVER,
    userID,
    kvStore: "mem",
  });
  return <ZP zero={zero}>{children}</ZP>;
}

export function useZero() {
  return useZ<Schema>();
}

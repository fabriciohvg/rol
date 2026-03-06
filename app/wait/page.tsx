"use client";

import { isServer, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

function getBaseURL() {
  if (!isServer) {
    return "";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

const baseURL = getBaseURL();
console.log("Base URL:", baseURL);

function useWaitQuery(props: { wait: number }) {
  const query = useSuspenseQuery({
    queryKey: ["wait", props.wait],
    queryFn: async () => {
      const path = `/api/wait?wait=${props.wait}`;
      const url = baseURL + path;
      console.log("Fetching URL:", url);

      const response: string = await (
        await fetch(url, {
          cache: "no-store",
        })
      ).json();

      return response;
    },
  });

  return [query.data as string, query] as const;
}

function MyComponent(props: { wait: number }) {
  const [data] = useWaitQuery(props);

  return <div>Result: {data}</div>;
}

export default function WaitPage() {
  return (
    <div className="max-w-lg mx-auto p-8 space-y-4">
      <Suspense fallback={<div>Waiting 100...</div>}>
        <MyComponent wait={100} />
      </Suspense>
      <Suspense fallback={<div>Waiting 500...</div>}>
        <MyComponent wait={500} />
      </Suspense>
      <Suspense fallback={<div>Waiting 1000...</div>}>
        <MyComponent wait={1000} />
      </Suspense>

      <fieldset className="border rounded p-4">
        <legend className="text-sm font-medium px-2 font-mono">
          Combined <code className="font-mono">Suspense</code>-container
        </legend>
        <Suspense fallback={<div>Waiting 100, 500 and 1000...</div>}>
          <MyComponent wait={100} />
          <MyComponent wait={500} />
          <MyComponent wait={1000} />
        </Suspense>
      </fieldset>
    </div>
  );
}

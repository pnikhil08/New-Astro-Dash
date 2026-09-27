"use client";

import { useGetdosAndDontApiQuery } from "@/app/redux/slice/doesDont";

export default function DosAndDontsPage() {
  const { data, isLoading, isError } = useGetdosAndDontApiQuery();

  if (isLoading) return <p className="p-6 text-center">Loading data...</p>;

  if (isError) {
    return (
      <p className="p-6 text-center text-red-500">
        Failed to load data.
      </p>
    );
  }

  return (
    <main className="p-6">
      <h1 className="wallet-head mb-6 text-center text-2xl font-bold">
        Do's and Don'ts
      </h1>

      <section className="space-y-6">
        <article>
          <h2 className="mb-3 text-lg font-semibold">Do's</h2>
          <div
            className="rounded-xl bg-gray-100 p-4"
            dangerouslySetInnerHTML={{ __html: data?.dos ?? "" }}
          />
        </article>

        <article>
          <h2 className="mb-3 text-lg font-semibold">Don'ts</h2>
          <div
            className="rounded-xl bg-gray-100 p-4"
            dangerouslySetInnerHTML={{ __html: data?.dont ?? "" }}
          />
        </article>
      </section>
    </main>
  );
}

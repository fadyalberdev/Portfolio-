import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 text-5xl font-medium tracking-tight">Nothing here.</h1>
        <Link href="/" className="mt-8 inline-block font-mono text-sm uppercase tracking-wider underline underline-offset-8 hover:text-accent">
          Back home
        </Link>
      </div>
    </main>
  );
}

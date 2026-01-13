import EmailSignupForm from "@/components/EmailSignupForm";

// Disable static generation since this page uses client-side Convex hooks
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-12 px-8 py-16 bg-white dark:bg-black sm:px-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-lg text-4xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            Learn AI Together
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Join our community-driven platform to learn artificial intelligence
            with hands-on projects, expert guidance, and collaborative learning.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-4">
          <h2 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
            Be the first to know when we launch
          </h2>
          <EmailSignupForm />
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </main>
    </div>
  );
}

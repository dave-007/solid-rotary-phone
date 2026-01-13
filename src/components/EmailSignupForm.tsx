"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

type FormState = "idle" | "loading" | "success" | "error";

export default function EmailSignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const createSignup = useMutation(api.signups.createSignup);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side validation
    if (!email.trim()) {
      setErrorMessage("Email is required");
      setFormState("error");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      setFormState("error");
      return;
    }

    setFormState("loading");

    try {
      const result = await createSignup({
        email: email.trim(),
        name: name.trim() || undefined,
      });

      if (result.success) {
        setFormState("success");
        setEmail("");
        setName("");
      } else {
        setErrorMessage(result.error);
        setFormState("error");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div className="w-full max-w-md rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-950">
        <svg
          className="mx-auto mb-4 h-12 w-12 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h3 className="mb-2 text-lg font-semibold text-green-800 dark:text-green-200">
          You&apos;re on the list!
        </h3>
        <p className="text-green-700 dark:text-green-300">
          Thanks for signing up. We&apos;ll be in touch soon.
        </p>
        <button
          onClick={() => setFormState("idle")}
          className="mt-4 text-sm text-green-600 underline hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
        >
          Sign up another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (formState === "error") setFormState("idle");
          }}
          placeholder="you@example.com"
          required
          disabled={formState === "loading"}
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400"
        />
      </div>

      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Name <span className="text-zinc-400">(optional)</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          disabled={formState === "loading"}
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400"
        />
      </div>

      {formState === "error" && errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={formState === "loading"}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 font-medium text-background transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-zinc-200"
      >
        {formState === "loading" ? (
          <>
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Signing up...
          </>
        ) : (
          "Get Early Access"
        )}
      </button>
    </form>
  );
}

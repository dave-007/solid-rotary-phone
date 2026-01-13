import { mutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

/**
 * Create a new signup with email (required) and name (optional).
 * Returns an error message if the email already exists.
 */
export const createSignup = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
  },
  returns: v.union(
    v.object({ success: v.literal(true), id: v.id("signups") }),
    v.object({ success: v.literal(false), error: v.string() })
  ),
  handler: async (ctx, args) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(args.email)) {
      return { success: false as const, error: "Please enter a valid email address" };
    }

    // Check for existing signup with this email
    const existing = await ctx.db
      .query("signups")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .unique();

    if (existing) {
      return { success: false as const, error: "This email is already signed up" };
    }

    // Create the signup
    const id = await ctx.db.insert("signups", {
      email: args.email.toLowerCase(),
      name: args.name?.trim() || undefined,
    });

    return { success: true as const, id };
  },
});

/**
 * Internal query to check if an email already exists.
 */
export const getSignupByEmail = internalQuery({
  args: {
    email: v.string(),
  },
  returns: v.union(
    v.object({
      _id: v.id("signups"),
      _creationTime: v.number(),
      email: v.string(),
      name: v.optional(v.string()),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const signup = await ctx.db
      .query("signups")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .unique();

    return signup;
  },
});

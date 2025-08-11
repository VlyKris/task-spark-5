import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return [];
    }

    return await ctx.db
      .query("todos")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("todos", {
      text: args.text,
      completed: false,
      userId: user._id,
    });
  },
});

export const toggle = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const todo = await ctx.db.get(args.id);
    if (!todo || todo.userId !== user._id) {
      throw new Error("Todo not found or unauthorized");
    }

    return await ctx.db.patch(args.id, {
      completed: !todo.completed,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("todos"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const todo = await ctx.db.get(args.id);
    if (!todo || todo.userId !== user._id) {
      throw new Error("Todo not found or unauthorized");
    }

    return await ctx.db.patch(args.id, {
      text: args.text,
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const todo = await ctx.db.get(args.id);
    if (!todo || todo.userId !== user._id) {
      throw new Error("Todo not found or unauthorized");
    }

    return await ctx.db.delete(args.id);
  },
});

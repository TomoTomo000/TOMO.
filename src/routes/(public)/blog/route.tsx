import { createFileRoute } from "@tanstack/react-router";
import { BlogLayout } from "@/features/blog/components/BlogLayout";

export const Route = createFileRoute("/(public)/blog")({
  component: BlogLayout,
});

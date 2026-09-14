import { createFileRoute } from "@tanstack/react-router";
import { BlogErrorPage } from "@/features/blog/components/BlogErrorPage";
import { BlogLayout } from "@/features/blog/components/BlogLayout";

export const Route = createFileRoute("/(public)/blog")({
  component: BlogLayout,
  errorComponent: BlogErrorPage,
});

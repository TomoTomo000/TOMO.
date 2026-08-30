import type { ComponentPropsWithoutRef } from "react";

type BlogContainerProps = ComponentPropsWithoutRef<"div">;

export function BlogContainer({
  className = "",
  ...props
}: BlogContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`.trim()}
      {...props}
    />
  );
}

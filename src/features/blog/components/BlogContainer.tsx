import type { ReactNode } from "react";

type BlogContainerProps = {
  children: ReactNode;
  className?: string;
};

export function BlogContainer({
  children,
  className = "",
}: BlogContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

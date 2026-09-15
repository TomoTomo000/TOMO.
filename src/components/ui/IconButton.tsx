import type { ComponentPropsWithRef } from "react";

type IconButtonVariant = "surface" | "ghost";
type IconButtonSize = "sm" | "md";

export type IconButtonProps = Omit<
  ComponentPropsWithRef<"button">,
  "aria-label"
> & {
  "aria-label": string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
};

const variantClassNames: Record<IconButtonVariant, string> = {
  surface:
    "bg-background text-ink transition-transform duration-300 ease-pop hover:scale-105",
  ghost:
    "text-muted transition-colors duration-150 hover:bg-ink/5 hover:text-ink",
};

const sizeClassNames: Record<IconButtonSize, string> = {
  sm: "size-9",
  md: "size-12",
};

export function IconButton({
  "aria-label": ariaLabel,
  variant = "ghost",
  size = "md",
  type = "button",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      type={type}
      aria-label={ariaLabel}
      className={[
        "grid cursor-pointer place-items-center rounded-full",
        variantClassNames[variant],
        sizeClassNames[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

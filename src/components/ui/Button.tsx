import { createLink, type LinkComponent } from "@tanstack/react-router";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseClassName =
  "inline-flex cursor-pointer items-center justify-center rounded-full text-center font-bold transition-transform duration-300 ease-pop hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100";

const variantClassNames: Record<ButtonVariant, string> = {
  primary: "bg-canvas text-background",
  secondary: "border border-ink/15 text-ink",
};

const sizeClassNames: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-sm",
};

function getButtonClassName({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleProps & { className?: string }) {
  return [
    baseClassName,
    variantClassNames[variant],
    sizeClassNames[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export type ButtonProps = ComponentPropsWithRef<"button"> & ButtonStyleProps;

export function Button({
  variant,
  size,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={getButtonClassName({ variant, size, className })}
    />
  );
}

type ButtonLinkBaseProps = ComponentPropsWithoutRef<"a"> & ButtonStyleProps;

const ButtonLinkBase = forwardRef<HTMLAnchorElement, ButtonLinkBaseProps>(
  function ButtonLinkBase({ variant, size, className, ...props }, ref) {
    return (
      <a
        {...props}
        ref={ref}
        className={getButtonClassName({ variant, size, className })}
      />
    );
  },
);

const CreatedButtonLink = createLink(ButtonLinkBase);

export const ButtonLink: LinkComponent<typeof ButtonLinkBase> = (props) => (
  <CreatedButtonLink {...props} />
);

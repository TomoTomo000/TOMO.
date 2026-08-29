import type {
  ComponentPropsWithRef,
  ReactNode,
} from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";

const fieldClassName =
  "w-full rounded-xl border-0 bg-background px-5 py-3.5 text-sm text-ink outline-none transition-shadow placeholder:text-muted/50 focus:ring-2 focus:ring-ink";

type FieldLabelProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
};

function FieldLabel({ htmlFor, label, required }: FieldLabelProps) {
  return (
    <label className="text-sm font-bold" htmlFor={htmlFor}>
      {label}
      {required ? (
        <span className="ml-1 text-terracotta-dark" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
}

type FieldErrorProps = {
  id: string;
  children?: ReactNode;
};

function FieldError({ id, children }: FieldErrorProps) {
  if (!children) {
    return null;
  }

  return (
    <p id={id} className="mt-2 text-xs text-ink" role="alert">
      {children}
    </p>
  );
}

type SharedFieldProps = {
  id: string;
  label: string;
  error?: ReactNode;
};

export type TextFieldProps = Omit<
  ComponentPropsWithRef<"input">,
  "id"
> &
  SharedFieldProps;

export function TextField({
  id,
  label,
  error,
  required,
  className,
  ref,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextFieldProps) {
  const errorId = `${id}-error`;
  const describedBy =
    [ariaDescribedBy, error ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required={required} />
      <input
        {...props}
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${fieldClassName} mt-2 ${className ?? ""}`}
      />
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}

export type SelectFieldProps = Omit<
  ComponentPropsWithRef<"select">,
  "id"
> &
  SharedFieldProps;

export function SelectField({
  id,
  label,
  error,
  required,
  className,
  children,
  ref,
  "aria-describedby": ariaDescribedBy,
  ...props
}: SelectFieldProps) {
  const errorId = `${id}-error`;
  const describedBy =
    [ariaDescribedBy, error ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required={required} />
      <div className="relative mt-2">
        <select
          {...props}
          ref={ref}
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${fieldClassName} appearance-none pr-12 ${className ?? ""}`}
        >
          {children}
        </select>
        <ChevronDownIcon
          className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-muted"
        />
      </div>
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}

export type TextareaFieldProps = Omit<
  ComponentPropsWithRef<"textarea">,
  "id"
> &
  SharedFieldProps;

export function TextareaField({
  id,
  label,
  error,
  required,
  className,
  ref,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextareaFieldProps) {
  const errorId = `${id}-error`;
  const describedBy =
    [ariaDescribedBy, error ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required={required} />
      <textarea
        {...props}
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${fieldClassName} mt-2 min-h-32 resize-y leading-7 ${className ?? ""}`}
      />
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}

"use client";

import { ArrowRight, Loader2, Paperclip, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Magnetic } from "@/components/animations/Magnetic";
import { SuccessPanel } from "./SuccessPanel";
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  serviceSelectOptions,
} from "@/lib/data/contact-content";
import { buildWhatsAppOrderURL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type FieldKey = "name" | "email" | "phone" | "service" | "subject" | "message" | "file";
type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  service: string;
  subject: string;
  message: string;
}

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  subject: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d\s()\-]+$/;
// access_key is public by design — Web3Forms scopes it to one destination inbox
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

function validate(values: FormValues, file: File | null): Partial<Record<FieldKey, string>> {
  const errors: Partial<Record<FieldKey, string>> = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "That doesn't look like an email.";
  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim()))
    errors.phone = "Phone has invalid characters.";
  if (!values.service) errors.service = "Pick a service (or \"Not sure\").";
  if (values.subject.length > 120) errors.subject = "Keep subject under 120 chars.";
  const trimmedMessage = values.message.trim();
  if (trimmedMessage.length < 10)
    errors.message = "Tell us a bit more (10+ characters).";
  else if (values.message.length > 2000)
    errors.message = "Trim message to 2000 chars or fewer.";
  if (file && file.size > MAX_FILE_SIZE_BYTES)
    errors.file = `File exceeds ${MAX_FILE_SIZE_MB}MB.`;
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  function setField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function markTouched(field: FieldKey) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate({ ...values }, file));
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null;
    setFile(next);
    setTouched((prev) => ({ ...prev, file: true }));
    setErrors(validate(values, next));
  }

  function clearFile() {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setErrors(validate(values, null));
  }

  function focusFirstError(nextErrors: Partial<Record<FieldKey, string>>) {
    const order: FieldKey[] = [
      "name",
      "email",
      "phone",
      "service",
      "subject",
      "message",
      "file",
    ];
    const first = order.find((key) => nextErrors[key]);
    if (!first || !formRef.current) return;
    const target = formRef.current.querySelector<HTMLElement>(
      `[data-field="${first}"]`,
    );
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
    target?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const honeypot = (form.elements.namedItem("botcheck") as HTMLInputElement)?.value;
    if (honeypot) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Honeypot triggered — dropping submission.");
      }
      setStatus("success");
      return;
    }

    const nextErrors = validate(values, file);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setTouched({
        name: true,
        email: true,
        phone: true,
        service: true,
        subject: true,
        message: true,
        file: true,
      });
      focusFirstError(nextErrors);
      return;
    }

    if (!accessKey) {
      toast.error("Form isn't configured yet. WhatsApp us instead.");
      return;
    }

    setStatus("submitting");
    const payload = new FormData();
    payload.append("access_key", accessKey);
    payload.append("name", values.name.trim());
    payload.append("email", values.email.trim());
    if (values.phone) payload.append("phone", values.phone.trim());
    payload.append("service", values.service);
    if (values.subject) payload.append("subject", values.subject.trim());
    payload.append("message", values.message.trim());
    payload.append(
      "from_name",
      `${values.name.trim()} via fonebazaar.ca`,
    );
    payload.append(
      "subject",
      `New fonebazaar enquiry: ${values.subject.trim() || values.service}`,
    );
    if (file) payload.append("attachment", file);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: payload,
      });
      const body = await response.json();
      if (!response.ok || !body.success) {
        throw new Error(body.message ?? "Submission failed");
      }
      setStatus("success");
    } catch (error) {
      console.error("Contact form error", error);
      setStatus("error");
      toast.error("Something went wrong. Try again or WhatsApp us.", {
        action: {
          label: "WhatsApp",
          onClick: () => window.open(buildWhatsAppOrderURL([]), "_blank"),
        },
      });
    }
  }

  function reset() {
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched({});
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setStatus("idle");
  }

  const visibleErrors: Partial<Record<FieldKey, string>> = Object.fromEntries(
    Object.entries(errors).filter(([key]) => touched[key as FieldKey]),
  );

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
          Send a message
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
          Tell us about your project.
        </h2>
        <p className="mt-2 text-xs text-muted-foreground">* required fields</p>
      </div>

      <div className="rounded-3xl border border-border/40 bg-surface-1 p-6 lg:p-10">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SuccessPanel onReset={reset} />
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              initial={false}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Honeypot />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FloatingField
                  id="name"
                  type="text"
                  label="Name"
                  required
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => setField("name", event.target.value)}
                  onBlur={() => markTouched("name")}
                  error={visibleErrors.name}
                />
                <FloatingField
                  id="email"
                  type="email"
                  label="Email"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => setField("email", event.target.value)}
                  onBlur={() => markTouched("email")}
                  error={visibleErrors.email}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FloatingField
                  id="phone"
                  type="tel"
                  label="Phone (optional)"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(event) => setField("phone", event.target.value)}
                  onBlur={() => markTouched("phone")}
                  error={visibleErrors.phone}
                />
                <FloatingField
                  id="subject"
                  type="text"
                  label="Subject (optional)"
                  maxLength={120}
                  value={values.subject}
                  onChange={(event) => setField("subject", event.target.value)}
                  onBlur={() => markTouched("subject")}
                  error={visibleErrors.subject}
                />
              </div>

              <ServiceField
                value={values.service}
                onChange={(next) => {
                  setField("service", next);
                  markTouched("service");
                }}
                error={visibleErrors.service}
              />

              <MessageField
                value={values.message}
                onChange={(next) => setField("message", next)}
                onBlur={() => markTouched("message")}
                error={visibleErrors.message}
              />

              <AttachmentField
                file={file}
                error={visibleErrors.file}
                fileInputRef={fileInputRef}
                onSelect={handleFile}
                onClear={clearFile}
              />

              <div className="flex flex-col items-stretch gap-3 pt-2 md:flex-row md:items-center md:justify-end">
                <Magnetic strength={0.25}>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    aria-busy={status === "submitting"}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-8 text-sm font-medium text-brand-foreground transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Honeypot() {
  return (
    <input
      type="text"
      name="botcheck"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      style={{ position: "absolute", left: "-9999px", opacity: 0 }}
    />
  );
}

interface FloatingFieldProps {
  id: FieldKey;
  type: "text" | "email" | "tel";
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
}

function FloatingField({
  id,
  type,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  autoComplete,
  maxLength,
}: FloatingFieldProps) {
  const hasError = Boolean(error);
  return (
    <div className="relative pt-6">
      <input
        id={id}
        name={id}
        type={type}
        placeholder=" "
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        data-field={id}
        className={cn(
          "peer block w-full bg-transparent pb-2 text-base text-foreground outline-none transition-colors",
          "border-b-2",
          hasError
            ? "border-red-500/70 focus:border-red-500"
            : "border-border/70 focus:border-brand",
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 top-6 text-base text-muted-foreground transition-all",
          "peer-focus:top-0 peer-focus:text-xs peer-focus:font-medium",
          "peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:font-medium",
          hasError ? "peer-focus:text-red-500" : "peer-focus:text-brand",
        )}
      >
        {label}
        {required ? <span className="ml-0.5 text-brand">*</span> : null}
      </label>
      {hasError ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-500/90">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface ServiceFieldProps {
  value: string;
  onChange: (next: string) => void;
  error?: string;
}

function ServiceField({ value, onChange, error }: ServiceFieldProps) {
  const hasError = Boolean(error);
  return (
    <div data-field="service">
      <label
        htmlFor="service"
        className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
      >
        Service interest <span className="text-brand">*</span>
      </label>
      <Select value={value} onValueChange={(next) => onChange(next ?? "")}>
        <SelectTrigger
          id="service"
          aria-invalid={hasError}
          aria-describedby={hasError ? "service-error" : undefined}
          className={cn(
            "h-12 rounded-xl bg-surface-2",
            hasError && "border-red-500/70",
          )}
        >
          <SelectValue placeholder="Which service is this about?" />
        </SelectTrigger>
        <SelectContent>
          {serviceSelectOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hasError ? (
        <p id="service-error" className="mt-1 text-xs text-red-500/90">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface MessageFieldProps {
  value: string;
  onChange: (next: string) => void;
  onBlur: () => void;
  error?: string;
}

function MessageField({ value, onChange, onBlur, error }: MessageFieldProps) {
  const hasError = Boolean(error);
  return (
    <div>
      <label
        htmlFor="message"
        className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
      >
        Message <span className="text-brand">*</span>
      </label>
      <textarea
        id="message"
        name="message"
        rows={5}
        required
        aria-required
        aria-invalid={hasError}
        aria-describedby={hasError ? "message-error" : undefined}
        maxLength={2000}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        data-field="message"
        placeholder="Tell us a bit about what you'd like to make, timeline, and anything else we should know."
        className={cn(
          "w-full resize-none rounded-xl border bg-surface-2 p-4 text-base leading-relaxed outline-none transition placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          hasError
            ? "border-red-500/70 focus:border-red-500"
            : "border-border/70 focus:border-brand",
        )}
      />
      <div className="mt-1 flex items-center justify-between">
        {hasError ? (
          <p id="message-error" className="text-xs text-red-500/90">
            {error}
          </p>
        ) : (
          <span />
        )}
        <span className="text-[11px] text-muted-foreground/80">
          {value.length}/2000
        </span>
      </div>
    </div>
  );
}

interface AttachmentFieldProps {
  file: File | null;
  error?: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

function AttachmentField({
  file,
  error,
  fileInputRef,
  onSelect,
  onClear,
}: AttachmentFieldProps) {
  const hasError = Boolean(error);
  return (
    <div data-field="file">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Attachment (optional)
      </span>
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor="attachment"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-brand/50 bg-brand/10 px-4 py-2 text-sm font-medium text-brand transition hover:border-brand hover:bg-brand/20"
        >
          <Paperclip className="h-4 w-4" />
          {file ? "Change file" : "Choose a file"}
        </label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          ref={fileInputRef}
          accept={ACCEPTED_FILE_TYPES}
          onChange={onSelect}
          className="sr-only"
        />
        {file ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1.5 text-xs text-muted-foreground">
            <span className="max-w-[14rem] truncate text-foreground">
              {file.name}
            </span>
            <span>· {(file.size / 1024 / 1024).toFixed(1)}MB</span>
            <button
              type="button"
              aria-label="Remove attachment"
              onClick={onClear}
              className="text-muted-foreground transition hover:text-brand"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ) : null}
      </div>
      <p className="mt-1.5 text-[11px] text-muted-foreground/80">
        Images, PDFs, SVGs, 3D files (STL/OBJ/STEP) — {MAX_FILE_SIZE_MB}MB max.
      </p>
      {hasError ? (
        <p className="mt-1 text-xs text-red-500/90">{error}</p>
      ) : null}
    </div>
  );
}

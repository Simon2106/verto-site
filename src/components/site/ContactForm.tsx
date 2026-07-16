import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/contact.functions";
import { toast } from "sonner";

interface Props {
  brand: "verto" | "edison-lux" | "vertek" | "modulr";
  defaultAudience?: "candidate" | "company" | "general";
  compact?: boolean;
}

export function ContactForm({ brand, defaultAudience = "general", compact }: Props) {
  const submit = useServerFn(submitContact);
  const [pending, setPending] = useState(false);
  const [audience, setAudience] = useState(defaultAudience);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setPending(true);
    try {
      await submit({
        data: {
          brand,
          audience,
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          company: String(fd.get("company") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      toast.success("Thanks — we'll be in touch shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPending(false);
    }
  }

  const inputCls =
    "w-full bg-transparent border-0 border-b border-[var(--border)] py-3 text-base outline-none transition focus:border-[var(--brand)] placeholder:text-muted-foreground";

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-5" : "space-y-6"}>
      <div className="flex gap-2 text-xs">
        {(["candidate", "company", "general"] as const).map((a) => (
          <button
            type="button"
            key={a}
            onClick={() => setAudience(a)}
            className="rounded-full px-3 py-1.5 transition"
            style={
              audience === a
                ? { background: "var(--brand)", color: "var(--brand-foreground)" }
                : { background: "transparent", border: "1px solid var(--border)", color: "var(--foreground)" }
            }
          >
            I'm a {a === "general" ? "general enquiry" : a}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <input name="name" required maxLength={120} placeholder="Full name *" className={inputCls} />
        <input name="email" required type="email" maxLength={255} placeholder="Email *" className={inputCls} />
        <input name="company" maxLength={160} placeholder="Company" className={inputCls} />
        <input name="phone" maxLength={40} placeholder="Phone" className={inputCls} />
      </div>
      <textarea name="message" required minLength={1} maxLength={4000} rows={compact ? 3 : 5}
        placeholder="How can we help? *" className={inputCls + " resize-none"} />
      <button type="submit" disabled={pending} className="btn-base btn-primary disabled:opacity-60">
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

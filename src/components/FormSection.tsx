export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm text-white/60">{description}</p>
      ) : null}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function TextField({
  label,
  placeholder,
  type = "text",
  name,
  defaultValue,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  name?: string;
  defaultValue?: string | number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-white/80">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white placeholder:text-white/30 focus:border-hallway-gold focus:outline-none"
      />
    </label>
  );
}

export function TextAreaField({
  label,
  placeholder,
  name,
  defaultValue,
}: {
  label: string;
  placeholder?: string;
  name?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-white/80">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={3}
        className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white placeholder:text-white/30 focus:border-hallway-gold focus:outline-none"
      />
    </label>
  );
}

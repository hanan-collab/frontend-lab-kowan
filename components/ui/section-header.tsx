interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <section className={`mb-6 ${className}`}>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      {subtitle && (
        <p className="text-sm text-white/80">{subtitle}</p>
      )}
    </section>
  );
}
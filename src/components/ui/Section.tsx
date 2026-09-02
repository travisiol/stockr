import { clsx } from "clsx";

/**
 * Section chrome for the terminal layout: an index, a name, and a rule that
 * runs to the edge of the column. Everything on this site is numbered so a
 * reader can tell where they are without a scrollbar.
 */
export function SectionHead({
  index,
  title,
  aside,
}: {
  index: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="label text-phos">[{index}]</span>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-fg">
        {title}
      </h2>
      <span aria-hidden className="h-px flex-1 bg-rule" />
      {aside}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "mx-auto w-full max-w-[1180px] scroll-mt-16 px-4 py-16 sm:px-6 sm:py-20",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function PanelHead({
  title,
  aside,
}: {
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="panel-head">
      <span className="flex items-center gap-2">
        <span aria-hidden className="text-phos">
          &#9698;
        </span>
        {title}
      </span>
      {aside}
    </div>
  );
}

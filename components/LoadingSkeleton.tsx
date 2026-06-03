export default function LoadingSkeleton() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-4xl space-y-4">
        {/* Header skeleton */}
        <div className="h-10 w-2/5 bg-slate-200 rounded animate-pulse" />

        {/* Cards grid skeleton */}
        <div className="grid gap-3 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-200 rounded animate-pulse" />
          ))}
        </div>

        {/* Content items skeleton */}
        {[...Array(3)].map((_, i) => (
          <article
            key={i}
            className="rounded border border-slate-200 bg-white p-4"
          >
            <div className="space-y-3">
              <div className="h-4 w-1/3 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-full bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-5/6 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-2/3 bg-slate-200 rounded animate-pulse" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

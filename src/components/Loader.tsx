interface LoaderProps {
  size?: number;
  label?: string;
  fullscreen?: boolean;
}

export function Loader({ size = 56, label, fullscreen }: LoaderProps) {
  const inner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <span
        className="loader-m leading-none select-none"
        style={{ fontSize: size }}
      >
        m
      </span>
      {label && (
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {inner}
      </div>
    );
  }
  return inner;
}

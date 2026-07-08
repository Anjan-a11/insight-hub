export function LogoImg({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <img
      src="/logo-thumb.png"
      alt="mybookEarn"
      className={`object-contain ${className}`}
    />
  );
}

export function LogoFull({ className = "h-10" }: { className?: string }) {
  return (
    <img
      src="/mybook-logo.png"
      alt="mybookEarn"
      className={`object-contain ${className}`}
    />
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return <LogoFull className={className} />;
}

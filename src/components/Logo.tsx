import logo from "@/assets/mybookearn-logo.png.asset.json";
import { Link } from "@tanstack/react-router";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  to?: string;
}

const sizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

export function Logo({ size = "md", showText = true, to = "/" }: LogoProps) {
  return (
    <Link to={to} className="flex items-center gap-2.5 group">
      <img
        src={logo.url}
        alt="mybookEarn"
        className={`${sizes[size]} object-contain transition-transform group-hover:scale-105`}
      />
      {showText && (
        <span className="font-display font-bold text-lg tracking-tight text-primary">
          mybook<span className="text-primary-glow">Earn</span>
        </span>
      )}
    </Link>
  );
}

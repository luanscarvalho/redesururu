import logo from "@/assets/logo.png.asset.json";

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return <img src={logo.url} alt="REDE SURURU" className={className} width={1920} height={600} />;
}

export const logoUrl = logo.url;

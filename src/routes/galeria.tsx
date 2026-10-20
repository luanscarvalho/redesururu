import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Nova abertura — REDE SURURU" },
      { name: "description", content: "A nova abertura da REDE SURURU: conexões entre comunidade acadêmica e inovação." },
      { property: "og:title", content: "Nova abertura — REDE SURURU" },
      { property: "og:description", content: "Conexões entre comunidade acadêmica e inovação em Alagoas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: GalleryRedirect,
});

function GalleryRedirect() {
  return <Navigate to="/" replace />;
}

import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const GET: APIRoute = async () => {
  const svgPath = join(process.cwd(), "public", "favicon.svg");
  const svg = readFileSync(svgPath, "utf-8");

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 32 },
  });

  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};

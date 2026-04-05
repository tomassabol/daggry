import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const SIZE = 180;

function loadLocalFont(filename: string): ArrayBuffer {
  const buffer = readFileSync(join(process.cwd(), "src", "assets", "fonts", filename));
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

export const GET: APIRoute = async () => {
  const fraunces = loadLocalFont("fraunces-300.woff");

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#F4F1EB",
          borderRadius: "36px",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                fontSize: "96px",
                fontFamily: "Fraunces",
                color: "#2C3531",
                fontWeight: 300,
                lineHeight: 1,
              },
              children: "d",
            },
          },
        ],
      },
    },
    {
      width: SIZE,
      height: SIZE,
      fonts: [
        {
          name: "Fraunces",
          data: fraunces,
          weight: 300,
          style: "normal" as const,
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: SIZE },
  });

  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};

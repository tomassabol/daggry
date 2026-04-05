import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const WIDTH = 1200;
const HEIGHT = 630;

function loadLocalFont(filename: string): ArrayBuffer {
  const buffer = readFileSync(join(process.cwd(), "src", "assets", "fonts", filename));
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

export const GET: APIRoute = async () => {
  const fraunces = loadLocalFont("fraunces-300.woff");
  const outfit = loadLocalFont("outfit-300.woff");

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
          position: "relative",
          overflow: "hidden",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-120px",
                left: "-100px",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: "#A3B1A6",
                opacity: 0.2,
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "-80px",
                right: "-60px",
                width: "350px",
                height: "350px",
                borderRadius: "50%",
                background: "#E6E2D6",
                opacity: 0.5,
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
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
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    },
                    children: "daggry",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            width: "40px",
                            height: "1px",
                            background: "#C2A878",
                          },
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: "20px",
                            fontFamily: "Outfit",
                            color: "#5A6053",
                            fontWeight: 300,
                            textTransform: "uppercase" as const,
                            letterSpacing: "0.12em",
                          },
                          children: "bageri & kaffebar",
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            width: "40px",
                            height: "1px",
                            background: "#C2A878",
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "18px",
                      fontFamily: "Outfit",
                      color: "#5A6053",
                      fontWeight: 300,
                      letterSpacing: "0.08em",
                    },
                    children: "Lyngby Hovedgade 66 \u00b7 Kongens Lyngby",
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "32px",
                display: "flex",
                gap: "6px",
                alignItems: "center",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#C2A878",
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "13px",
                      fontFamily: "Outfit",
                      color: "#5A6053",
                      fontWeight: 300,
                      letterSpacing: "0.06em",
                    },
                    children: "daggrykaffe.dk",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 300, style: "normal" as const },
        { name: "Outfit", data: outfit, weight: 300, style: "normal" as const },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
  });

  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};

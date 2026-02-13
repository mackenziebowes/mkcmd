import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "mkcmd",
    short_name: "mkcmd",
    description: "CLI Architecture Suite - Scaffold robust, agent-ready command line interfaces",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfcfc",
    theme_color: "#3d5afe",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "English-learning Tutor for Hindi Speakers",
    short_name: "English Tutor",
    description: "Understand English. Speak English. Think in English.",
    start_url: "/",
    display: "standalone",
    background_color: "#11131B",
    theme_color: "#3B5FD8",
    orientation: "portrait-primary",
    lang: "en",
  };
}

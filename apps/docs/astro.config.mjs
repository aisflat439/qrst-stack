import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "QRST",
      social: {
        github: "https://github.com/aisflat439/qrst-stack",
      },
      description:
        "QRST is an attempt by Devin to write down the rest of the stuff you need to know to build full stack projects on SST.",
      sidebar: [
        {
          label: "Book",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Intro", link: "/book/intro/" },
            { label: "Chapter One", link: "/book/chapter-one/" },
            { label: "Chapter Two", link: "/book/chapter-two/" },
            { label: "Chapter Three", link: "/book/chapter-three/" },
            { label: "Chapter Four", link: "/book/chapter-four/" },
          ],
        },
        {
          label: "Tutorials",
          autogenerate: { directory: "tutorials" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});

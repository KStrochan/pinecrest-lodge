import type { SiteConfig } from "./types";

export const site: SiteConfig = {
  name: "Pinecrest Lodge",
  description: "A small mountain lodge with cabins, a sauna and trails starting at the door.",
  url: "https://pinecrest-lodge.vercel.app",
  locale: "en",
  routes: ["/", "/gallery", "/booking"],
  nav: [
    { href: "/#stay", label: "Stay" },
    { href: "/#do", label: "Things to do" },
    { href: "/gallery", label: "Gallery" },
    { href: "/booking", label: "Book" },
  ],
  contact: {
    phone: "+1 (555) 018-6600",
    address: "Pinecrest Road 12, Hollow Pass",
    hours: "Reception 8:00 to 22:00, check-in from 15:00",
  },
  photoCredits: [
    { author: "Michael Chambers", url: "https://unsplash.com/@mchambers140" },
    { author: "Vulpyr Photography", url: "https://unsplash.com/@vulpyr_photography" },
    { author: "HUUM", url: "https://unsplash.com/@huumsauna" },
    { author: "Clay Banks", url: "https://unsplash.com/@claybanks" },
    { author: "Tom Jur", url: "https://unsplash.com/@tomjur" },
    { author: "Hans", url: "https://unsplash.com/@hansphoto" },
    { author: "Bas van der Horst", url: "https://unsplash.com/@bybas" },
    { author: "Kyle Glenn", url: "https://unsplash.com/@kylejglenn" },
    { author: "Taylor Hammersla", url: "https://unsplash.com/@taylor_hammersla" },
    { author: "Thulfiqar Ali", url: "https://unsplash.com/@thulfiqarali" },
  ],
};

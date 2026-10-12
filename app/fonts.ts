import localFont from "next/font/local";

export const headingFont = localFont({
  src: "./fonts/playfair-display-latin-wght-normal.woff2",
  variable: "--font-heading",
  display: "swap",
});

export const bodyFont = localFont({
  src: "./fonts/jost-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
});

export const fontVariables = `${headingFont.variable} ${bodyFont.variable}`;

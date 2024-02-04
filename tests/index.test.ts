import type { Element } from "hast";
import { toHtml } from "hast-util-to-html";
import { rehype } from "rehype";
import rehypeMinifyWhitespace from "rehype-minify-whitespace";
import { readSync } from "to-vfile";
import { expect, test } from "vitest";

import { type RehypeSemanticImages, rehypeSemanticImage } from "../src/index.js";

const planeProcessor = rehype().data("settings", { fragment: true }).use(rehypeMinifyWhitespace);

const run = (name: string, options: boolean | Partial<RehypeSemanticImages> = true) => {
  const processor = rehype()
    .data("settings", { fragment: true })
    .use(rehypeSemanticImage, options)
    .use(rehypeMinifyWhitespace);

  const inputNode = processor.runSync(planeProcessor.parse(readSync(`./tests/fixtures/${name}/input.html`)));
  const input = toHtml(inputNode as unknown as Element);

  const outputNode = planeProcessor.runSync(planeProcessor.parse(readSync(`./tests/fixtures/${name}/output.html`)));
  const output = toHtml(outputNode as unknown as Element);

  test(name, () => {
    expect(input).toBe(output);
  });
};

run("basic");
run("customClassesAndIDs", {
  elements: {
    container: { className: "custom-container", id: "containerID" },
    figure: { className: "custom-figure", id: "figureID" },
    figcaption: { className: "custom-figcaption", id: "figcaptionID" },
    img: { className: "custom-image", id: "imageID" },
  },
});
run("disableContainer", {
  elements: { container: { disable: true } },
});
run("disableFigure", {
  elements: { figure: { disable: true } },
});
run("disableFigcaption", {
  elements: { figcaption: { disable: true } },
});
run("disableLazy", { disableLazy: true });
run("sizes", {
  sizes: "(min-width: 960px) 720px, 100vw",
});
run("srcSetBuilder", {
  srcSetBuilder: (url) => `${url} 1x, ${url} 2x`,
});
run("urlBuilder", {
  urlBuilder: (url) => "https://mycdn.com/" + url,
});

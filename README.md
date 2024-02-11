# rehype-semantic-images

![test workflow](https://github.com/benjamincharity/rehype-semantic-images/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/benjamincharity/rehype-semantic-images/branch/main/graph/badge.svg?token=T3Z18P56LV)](https://codecov.io/gh/benjamincharity/rehype-semantic-images)
![NPM Version](https://img.shields.io/npm/v/@benjc/rehype-semantic-images)

This plugin enhances images in HTML documents processed by rehype in the unified ecosystem. It adds semantic elements such as figure, figcaption, and customizable container elements, and supports lazy loading options, custom class names, and IDs. It enables dynamic source set and URL building, which allows developers to improve accessibility, SEO, and performance of web pages. With fine-grained control over image presentation and loading behavior, this plugin provides developers with greater flexibility and customization options.

## Install

```
npm i -D @benjc/rehype-semantic-images
```

## Usage

```typescript
import rehypeSemanticImages from "@benjc/rehype-semantic-images";
import rehype from "rehype";
import rehypeParse from "rehype-parse";
import { unified } from "unified";

unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeSemanticImages)
  .process(`<img src="image.jpg" alt="My alt text" />`);

// Or with options:
unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeSemanticImages, {
    urlBuilder: (src) => `https://my-cdn.com/${src}`,
  })
  .process(`<img src="image.jpg" alt="My alt text" />`);
```

### Input

```html
<img src="image.jpg" alt="My alt text" />
```

### Output

```html
<figure class="rsi-figure">
  <div class="rsi-container">
    <img class="rsi-image" alt="My alt text" loading="lazy" sizes="100vw" src="image.jpg" srcset="image.jpg 1x" />
  </div>
  <figcaption class="rsi-figcaption">My alt text</figcaption>
</figure>
```

## Options

| Option                | Type             | Description                                                                                                                                         |
| --------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `urlBuilder`          | Function         | A function that takes the `src` of an image and returns a new `src`.                                                                                |
| `disableLazy`         | Boolean          | If `true`, the `loading` attribute of the `img` element will be set to `"eager"`. Otherwise, it will be set to `"lazy"`.                            |
| `defaultSizes`        | String           | The value for the `sizes` attribute of the `img` element.                                                                                           |
| `elements.img`        | Object           | An object containing additional properties for the `img` element.                                                                                   |
| `elements.container`  | Object           | An object containing properties for the `div` container element. If `disable` is `true`, the container will not be added.                           |
| `elements.figcaption` | Object           | An object containing properties for the `figcaption` element. If `disable` is `true`, the `figcaption` will not be added.                           |
| `elements.figure`     | Object           | An object containing properties for the `figure` element. If `disable` is `true`, the `figure` will not be added.                                   |
| `srcSetSteps`         | Array of numbers | An array of multipliers for generating the `srcSet` attribute of the `img` element. If not provided or empty, only the original `src` will be used. |

These options can be passed to the `rehype-semantic-images` plugin as part of the `options` object. For example:

```typescript
rehypeSemanticImages({
  defaultSizes: "(min-width: 960px) 720px, 100vw",
  disableLazy: false,
  elements: {
    container: { className: "custom-container", id: "containerID", disable: false },
    figcaption: { className: "custom-figcaption", id: "figcaptionID", disable: false },
    figure: { className: "custom-figure", id: "figureID", disable: false },
    img: { className: "custom-image", id: "imageID" },
  },
  srcSetSteps: [1, 2, 3],
  urlBuilder: (src) => `https://my-cdn.com/${src}`,
});
```

This will customize the top and bottom links according to the provided options.

## License

[MIT][license] © [benjamincharity][author]

[license]: license
[author]: https://www.benjamincharity.com

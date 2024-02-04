# rehype-semantic-images

![test workflow](https://github.com/benjamincharity/rehype-semantic-images/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/benjamincharity/rehype-semantic-images/branch/main/graph/badge.svg?token=T3Z18P56LV)](https://codecov.io/gh/benjamincharity/rehype-semantic-images)

## Motivation

TODO

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

unified().use(rehypeParse, { fragment: true }).use(rehypeSemanticImages).process("<h1>Title</h1><p>Content</p>");

// Or with options:
unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeSemanticImages, {
    // topLink: { disabled: true },
    // bottomLink: {
    //   text: `Back to top ↑`,
    //   classes: "animated-link-underline",
    // },
  })
  .process("<h1>Title</h1><p>Content</p>");
```

### Input

```html
<h1>Title</h1>
<p>Content</p>
```

### Output

```html
<div class="scroll-to-wrapper">
  <a aria-label="Scroll to bottom" href="#bottom" id="top" class="scroll-to scroll-to--top">Scroll to bottom</a>
</div>
<h1>Title</h1>
<p>Content</p>
<div class="scroll-to-wrapper">
  <a aria-label="Scroll to top" href="#top" id="bottom" class="scroll-to scroll-to--bottom">Scroll to top</a>
</div>
```

## Options

| Option                 | Type      | Description                         | Default              |
| ---------------------- | --------- | ----------------------------------- | -------------------- |
| `topLink.ariaLabel`    | `string`  | Aria label for the top link         | `"Scroll to bottom"` |
| `topLink.classes`      | `string`  | CSS classes for the top link        | `""`                 |
| `topLink.disabled`     | `boolean` | Whether the top link is disabled    | `false`              |
| `topLink.id`           | `string`  | ID for the top link                 | `"top"`              |
| `topLink.text`         | `string`  | Text for the top link               | `"Scroll to bottom"` |
| `bottomLink.ariaLabel` | `string`  | Aria label for the bottom link      | `"Scroll to top"`    |
| `bottomLink.classes`   | `string`  | CSS classes for the bottom link     | `""`                 |
| `bottomLink.disabled`  | `boolean` | Whether the bottom link is disabled | `false`              |
| `bottomLink.id`        | `string`  | ID for the bottom link              | `"bottom"`           |
| `bottomLink.text`      | `string`  | Text for the bottom link            | `"Scroll to top"`    |

These options can be passed to the `rehype-semantic-images` plugin as part of the `options` object. For example:

```typescript
rehypeScrollToTop({
  topLink: {
    ariaLabel: "Go to bottom",
    classes: "my-custom-class",
    disabled: false,
    id: "my-top-link",
    text: "Go to bottom",
  },
  bottomLink: {
    ariaLabel: "Go to top",
    classes: "my-other-custom-class",
    disabled: false,
    id: "my-bottom-link",
    text: "Go to top",
  },
});
```

This will customize the top and bottom links according to the provided options.

## License

[MIT][license] © [benjamincharity][author]

[license]: license
[author]: https://www.benjamincharity.com

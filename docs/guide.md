---
title: Guide
sidebar: auto
---

## What is ScrollOut?

ScrollOut is a JavaScript microlibrary that detects scroll/resize changes in the browser and assigns attributes and live CSS Variables to the scrolling element and a list of targets.

The ScrollOut library does not handle any animation, but it gives you the elements and tools needed to create animations & transitions with JavaScript animation libraries or only CSS!

The general flow is:

- Decorate your targets with `data-scroll` attribute
- Call ScrollOut() from JavaScript
- Each `data-scroll` is set to in or out when it comes in or goes out of view
- As the element scrolls, it flips in and out
- Enable `cssProps` in the [configuration](#configuration) to add live CSS Variables
- Animate those elements with CSS or JavaScript!

#

## Getting Started

### Installing from a CDN

Include the following script in the head of your document

```html
<script src="https://unpkg.com/scroll-out/dist/scroll-out.min.js"></script>
```

On document load/ready or in a script at the bottom the of the `<body>`, do the following:

```js
ScrollOut({
  /* options */
});
```

### Installing from NPM

Install scroll-out from NPM:

```bash
npm i scroll-out -S
```

Them import ScrollOut from the package and call it

```js
import ScrollOut from "scroll-out";

ScrollOut({
  /* options */
});
```

### Compatibility

ScrollOut is compatible with all modern browsers and Internet Explorer. CSS Custom Properties are available to browsers that support CSS Variables ([~85% of the current browser market share](https://caniuse.com/#feat=css-variables)).

If you experience an issue with a browser that is prior to IE11, please [create an issue](https://github.com/scroll-out/scroll-out/issues/new) so we can look at adding support.

## Tips (How do I?...)

### Perform a Fade In with CSS

Add this to your css.

```css
[data-scroll] {
  transition: opacity 1s;
}
[data-scroll="in"] {
  opacity: 1;
}
[data-scroll="out"] {
  opacity: 0;
}
```

Add this to your page to select all elements with `data-scroll` on them.

```html
<script>
ScrollOut();
</script>
```

### Perform a Fade with JavaScript

```js
ScrollOut({
  onShown: function(el) {
    // use the web animation API
    el.animate([{ opacity: 0 }, { opacity: 1 }], 1000);
  },
  onHidden: function(el) {
    // hide the element initially
    el.style.opacity = 0;
  }
});
```

### Use it with Animate.css

When using Animate.css, you can trigger animations by adding the `animated` class.

```js
ScrollOut({
  onShown(el) {
    el.classList.add("animated");
  }
});
```

### Force Animate.css Replay

When using animate.css, you may need to force the animation to play a second time. Luckily there is a handy way to force the browser to reflow the document and replay the animation:

```js
ScrollOut({
  onShown: function(el) {
    // remove the class
    el.classList.remove("animated");

    // force reflow
    void el.offsetWidth;

    // re-add the animated cl
    el.classList.add("animated");
  }
});
```

> This code sample uses the Web Animation API (Available on Chrome and FireFox). The general idea works for any animation library.

### Target a Scroll Container

To use a scrolling pane other than the window, provide a scrollingElement as a css selector or an element.

```js
ScrollOut({
  scrollingElement: ".scrollable-pane"
});
```

### Create a Sticky Header

The following example shows how to create a sticky header with ScrollOut.

```html
<html>
<head>
    <style>
        .hero {
            height: 400px;
        }
        .header {
            position: relative;
            height: 100px;
        }
        .sticky-header {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 100px;
        }
        .sticky-header[data-scroll="on"] {
            position: fixed;
        }
    </style>
</head>
<body>
    <div class="hero"></div>
    <div class="header">
        <div class="sticky-header">HEADER</div>
    </div>
    <script>
        ScrollOut({
            targets: '.sticky-header',
            offset: 400
        })
    </script>
</body>
</html>
```

### Use with Frameworks

Most JS frameworks have setup/teardown methods that should be used when using ScrollOut.

#### Vue

```js
export default {
  mounted() {
    this.so = ScrollOut({
      scope: this.$el
    });
  },
  destroyed() {
    this.so.teardown();
  }
};
```

#### Angular

```ts
@Component(/**/)
export class MyComponent implements AfterContentInit, OnDestroy {
  so: any;

  constructor(private el: ElementRef) {}

  ngAfterContentInit() {
    this.so = ScrollOut({
      scope: this.el.nativeElement
    });
  }

  ngOnDestroy() {
    this.so.teardown();
  }
}
```

## What's New?

- v2.0.0 - Checkout this [CodePen post](https://codepen.io/notoriousb1t/post/introducing-scroll-out-2) for all the exciting new features in 2.0.0

## API

### Configuration

| Options          | Description                                                                                                                                                                                                                   |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cssProps         | If `true`, all CSS Variables will be added to the scrolling element and all targets. If `false`, only the `[data-scroll]` property will be modified on targets. For more control, see [CSS Props Options](#css-props-options) |
| offset           | The targets become visible when they reach this distance in pixels from the top of the screen. Setting this option overrides all other collision detection                                                                    |
| once             | Elements will only be changed from scroll-out to scroll-in once. This is useful if you want to transition all elements exactly once. The default value is false.                                                              |
| scope            | Use this is specify the root element to use when resolving targets. If not specified, the scrollingElement is used.                                                                                                           |
| scrollingElement | The scrolling container. When scope is not specified, it is assumed that all targets are children of this element. If not specified, the documentElement is used.                                                             |
| targets          | An optional list of elements or a css selector. By default, this is `[data-scroll]`                                                                                                                                           |
| threshold        | The ratio of the element that must be visible before it is marked as visible. Providing the value 0.2 would require 20% of the element to be visible before marking it visible                                                |

### Events

#### Event Handlers

The following event handlers can be added to the ScrollOut constructor:

```ts
ScrollOut({
  onShown: function(element, ctx, scrollingElement) {
    /* Triggered when an element is shown */
  },
  onHidden: function(element, ctx, scrollingElement) {
    /* Triggered when an element is hidden */
  },
  onChange: function(element, ctx, scrollingElement) {
    /* Triggered when an element changes visibility */
  }
});
```

#### Event Context (ctx)

The following context object is passed to each of the event handlers.

| Property      | Description                                                                                                                                         |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| offsetX       | The distance from the left of the scrolling element                                                                                                 |
| offsetY       | The distance from the top of the scrolling element                                                                                                  |
| elementWidth  | The width of the element                                                                                                                            |
| elementHeight | The height of the element                                                                                                                           |
| intersectX    | The position of an element vs the viewport. Top = -1, In view = 0, 1 = Bottom                                                                       |
| intersectY    | The position of an element vs the viewport. Left = -1, In view = 0, 1 = Right                                                                       |
| viewportX     | The horizontal position of an element relative to the center of viewport. Left = -1, centered = 0, and 1 = Right. This is most useful for parallax. |
| viewportY     | The vertical position of an element relative to the center of viewport. Top = -1, centered = 0, and 1 = Bottom. This is most useful for parallax.   |
| visible       | Equal to 1 if the element is visible in the viewport, 0 if not. Can be tweaked by using the threshold option.                                       |
| visibleX      | The ratio of visible horizontal content. 0 if invisible, 1 if 100% visible                                                                          |
| visibleY      | The ratio of visible vertical content. 0 if invisible, 1 if 100% visible                                                                            |

### Methods

`ScrollOut` has a few methods to handle specialized cases. `index()` and `update()` can be used for manually refreshing the DOM. `teardown` is useful when building a Single Page Application.

| Method        | Description                                                                                                                       |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| `.index()`    | Manually searches for elements. This is intended for when DOM elements are removed or inserted by a JS framework.                 |
| `.update()`   | Manually checks if the elements have been updated. This is intended for when a JS framework changes the visual layout of the DOM. |
| `.teardown()` | If you no longer need a ScrollOut instance, call the `teardown()` function.                                                       |

### Scrolling Element

#### Scroll Direction

`ScrollOut` detects the direction on the horizontal and vertical axis.  This is useful for creating CSS styles that are different when scrolling down vs scrolling up.

| Attributes          | Description                                                                           |
| :------------------ | :------------------------------------------------------------------------------------ |
| `data-scroll-dir-x` | The current horizontal direction -1, 1, or 0 of the scroll. -1 is up, and 1 is down.  |
| `data-scroll-dir-y` | The current vertical direction -1, 1, or 0 of the scroll. -1 is left, and 1 is right. |

| Variable         | Description                                                                           |
| :--------------- | :------------------------------------------------------------------------------------ |
| `--scroll-dir-x` | The current horizontal direction -1, 1, or 0 of the scroll. -1 is up, and 1 is down.  |
| `--scroll-dir-y` | The current vertical direction -1, 1, or 0 of the scroll. -1 is left, and 1 is right. |

#### Scroll Percentage

`ScrollOut` calculates the total percentage of a scrolling element is scrolled and provides that as a CSS Variable.  This is useful for parallax backgrounds or other effects.

| Variable             | Description                                                            |
| :------------------- | :--------------------------------------------------------------------- |
| `--scroll-percent-x` | The ratio of horizontal scroll progress. It starts at 0 and ends at 1. |
| `--scroll-percent-y` | The ratio of vertical scroll progress. It starts at 0 and ends at 1.   |

### Scroll Targets

#### Target Dimensions

| Variable           | Description                       |
| :----------------- | :-------------------------------- |
| `--element-width`  | The current width of the element  |
| `--element-height` | The current height of the element |

#### Target Position

| Variable        | Description                                                                                                                                         |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--intersect-x` | The position of an element vs the viewport. Top = -1, In view = 0, 1 = Bottom                                                                       |
| `--intersect-y` | The position of an element vs the viewport. Left = -1, In view = 0, 1 = Right                                                                       |
| `--offset-x`    | The number of pixels from the left side of the scrolling element.                                                                                   |
| `--offset-y`    | The number of pixels from the top of the scrolling element                                                                                          |
| `--viewport-x`  | The horizontal position of an element relative to the center of viewport. Left = -1, centered = 0, and 1 = Right. This is most useful for parallax. |
| `--viewport-y`  | The vertical position of an element relative to the center of viewport. Top = -1, centered = 0, and 1 = Bottom. This is most useful for parallax.   |

#### Target Visibility

| Attribute     | Description                                                                                                                                           |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-scroll` | "in" or "out". "in" if the element is visible, "out" if it is not. Decorate your elements with this attribute to automatically target these elements. |

| Variable      | Description                                                          |
| :------------ | :------------------------------------------------------------------- |
| `--visible`   | The value is 1 if the element is considered visible, 0 if not.       |
| `--visible-x` | The current ratio of visible content on the horizontal axis (0 to 1) |
| `--visible-y` | The current ratio of visible content on the vertical axis (0 to 1)   |

### CSS Props Options

For performance / cleanliness reasons, it is desirable to opt into particular CSS Variables. In addition to true/false, the `cssProps` options can also accept an object that describes which properties should be enabled or disabled. When specifying this options object, all variables are opt-in. For instance, in the following examples, only `--viewport-y` and `--visible-y` would be set on the elements:

```ts
ScrollOut({
  cssProps: {
    viewportY: true,
    visibleY: true
  }
});
```

Both Target and Scrolling Element CSS Variables are controlled by this option.

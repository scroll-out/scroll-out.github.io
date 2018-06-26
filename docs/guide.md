---
title: Guide
sidebar: auto
---

## Installation

### Using a CDN

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

### Using NPM

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

## Demos

### Scaling Gallery on Scroll

This demo shows how to use how to use the css property ```--visible-y``` to change the shape and visibility of targets as the element is scrolled.

https://codepen.io/notoriousb1t/pen/GGXgbP

## Tips (How do I?...)

### Perform a Fade In with CSS

Add this to your css.

```css
.fade-in {
    transition: opacity 1s;
}
.fade-in[data-scroll="in"] {
    opacity: 1;
}
.fade-in[data-scroll="out"] {
    opacity: 0;
}
```

Add this to your page to select `.fade-in`

```html
<script>
ScrollOut();
</script>
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

### Force a CSS Animation to replay in Animate.css

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

### Perform a Fade with JavaScript the first time an element appears

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

### Use ScrollOut with a JS Framework

Most JS frameworks have setup/teardown methods that should be used when using ScrollOut.

#### Vue

```js
export default {
  data() {
    return {
      so: undefined
    }
  },
  mounted() {
    this.so = ScrollOut({
      scope: this.$el
    });
  },
  destroyed() {
    this.so.teardown();
  }
})
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

## API

### Configuration

| Options          | Description                                                                                                                                                                    |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cssProps | If true, the ```data-scroll``` elements and the ```scrollingElement``` will be decorated with css properties. If false, only data attributes will be used. |
| offset | The targets become visible when they reach this distance in pixels from the top of the screen. Setting this option overrides all other collision detection |
| once | Elements will only be changed from scroll-out to scroll-in once. This is useful if you want to transition all elements exactly once. The default value is false. |
| scope | Use this is specify the root element to use when resolving targets. If not specified, the scrollingElement is used. |
| scrollingElement | The scrolling container. When scope is not specified, it is assumed that all targets are children of this element. If not specified, the documentElement is used. |
| targets | An optional list of elements or a css selector. By default, this is `[data-scroll]` |
| threshold | The ratio of the element that must be visible before it is marked as visible. Providing the value 0.2 would require 20% of the element to be visible before marking it visible |

### Events

| Event                                    | Description                                     |
| :--------------------------------------- | :---------------------------------------------- |
| onShown(element, ctx, scrollingElement)  | Callback for when an element is show            |
| onHidden(element, ctx, scrollingElement) | Callback for when an element is hidden          |
| onChange(element, ctx, scrollingElement) | Callback for when an element changes visibility |

### Event Context

| Property | Description                                                                                   |
| :------- | :-------------------------------------------------------------------------------------------- |
| offsetX  | The distance from the left of the scrolling element |
| offsetY  | The distance from the top of the scrolling element |
| elementWidth  | The width of the element |
| elementHeight  | The height of the element |
| visible  | Equal to 1 if the element is visible in the viewport, 0 if not. Can be tweaked by using the threshold option. |
| visibleX | The ratio of visible horizontal content. 0 if invisible, 1 if 100% visible                    |
| visibleY | The ratio of visible vertical content. 0 if invisible, 1 if 100% visible                      |

### Methods

| Method      | Description                                                                                                                       |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| ```.index()```    | Manually searches for elements. This is intended for when DOM elements are removed or inserted by a JS framework.                 |
| ```.update()```   | Manually checks if the elements have been updated. This is intended for when a JS framework changes the visual layout of the DOM. |
| ```.teardown()``` | If you no longer need a ScrollOut instance, call the `teardown()` function:                                                       |

### Scroll Element Data Attributes

| Variable      | Description                                                                                                                     |
| :----------------- | :----------------------------------  |
| ```data-scroll-dir-x``` | The current horizontal direction -1, 1, or 0 of the scroll. -1 is up, and 1 is down. | 
| ```data-scroll-dir-y``` | The current vertical direction -1, 1, or 0 of the scroll. -1 is left, and 1 is right. | 


### Scroll Target Data Attributes

| Variable      | Description                                                                                                                     |
| :----------------- | :----------------------------------  |
| ```data-scroll``` | "in" or "out".  "in" if the element is visible, "out" if it is not.  Decorate your elements with this attribute to automatically target these elements. |

### Scroll Element CSS Variables

| Variable      | Description                                                                                                                     |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| ```--scroll-dir-x``` | The current horizontal direction -1, 1, or 0 of the scroll. -1 is up, and 1 is down. |
| ```--scroll-dir-y``` | The current vertical direction -1, 1, or 0 of the scroll. -1 is left, and 1 is right. |


### Scroll Target CSS Variables


| Variable      | Description |
| :----------  |  :--------------------------------------------------------------------------------------------------------------- |
| ```--element-width``` | The current width of the element |
| ```--element-height``` | The current height of the element |
| ```--offset-x``` | The number of pixels from the left side of the scrolling element |
| ```--offset-y``` | The number of pixels from the top of the scrolling element |
| ```--visible``` | The value is 1 if the element is considered visible, 0 if not. |
| ```--visible-x``` | The current ratio of visible content on the horizontal axis (0 to 1) |
| ```--visible-y``` | The current ratio of visible content on the vertical axis (0 to 1)  |


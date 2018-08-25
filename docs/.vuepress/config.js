module.exports = {
  title: "ScrollOut",
  description: "Animate on Scroll",
  head: [
    [
      "meta",
      {
        name: "keywords",
        content:
          "scroll-out scrollout text animation css variables custom properties"
      }
    ],
    [
      "meta",
      {
        name: "twitter:card",
        value: "Effects and CSS Vars on Scroll!"
      }
    ],
    [
      "meta",
      {
        property: "og:title",
        content: "ScrollOut"
      }
    ],
    [
      "meta",
      {
        property: "og:type",
        content: "article"
      }
    ],
    [
      "meta",
      {
        property: "og:url",
        content: "https://scroll-out.github.io/"
      }
    ],
    // ["meta", {
    //   property: "og:image",
    //   content: "https://scroll-out.github.io/image.gif"
    // }],
    [
      "meta",
      {
        property: "og:description",
        content: "CSS Vars for split words, chars, images and more!"
      }
    ],
    // prettier-ignore
    ["link", { rel: "icon", href: "/favicon.png" }],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Open+Sans|Raleway" }]
  ],
  themeConfig: {
    nav: [
      {
        text: "Guide",
        link: "/guide.md"
      },
      {
        text: "API",
        link: "/guide.md#api"
      },
      {
        text: "Demos",
        link: "https://codepen.io/collection/npPbNM/"
      }
    ],
    // Assumes GitHub. Can also be a full GitLab url.
    repo: "scroll-out/scroll-out",
    repoLabel: "View on GitHub",

    // if your docs are in a different repo from your main project:
    docsRepo: "scroll-out/scroll-out.github.io",
    // if your docs are not at the root of the repo:
    docsDir: "docs",
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: "source",
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Edit Page"
  }
};

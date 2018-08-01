module.exports = {
  title: "Scroll Out",
  description: "Animate on Scroll",
  head: [
    // prettier-ignore
    ["link",  { rel: "icon", href: "/favicon.png" }],
    ["script", { src: "https://unpkg.com/scroll-out@1.1.0/dist/scroll-out.js" }]
  ],
  themeConfig: {
    nav: [{ text: "Guide", link: "/guide.md" }],
    // Assumes GitHub. Can also be a full GitLab url.
    repo: "scroll-out/scroll-out",
    repoLabel: "Contribute!",

    // if your docs are in a different repo from your main project:
    docsRepo: "scroll-out/scroll-out.github.io",
    // if your docs are not at the root of the repo:
    docsDir: "docs",
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: "source",
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Help us improve this page!"
  }
};

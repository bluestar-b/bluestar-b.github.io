import markdownit from "markdown-it";

const md = new markdownit();

self.onmessage = (e) => {
  const markdown = e.data;
  const html = md.render(markdown, {
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    xhtmlOut: true,
  });

  self.postMessage(html);
};

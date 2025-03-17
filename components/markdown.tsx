import React from "react";
import markdownit from "markdown-it";
import DOMPurify from "dompurify";

const md = markdownit();

type Props = {
  content: string;
};

const Markdown = ({ content }: Props) => {
  const html_ = md.render(content);
  const purifiedHtml = DOMPurify.sanitize(html_);

  return <div dangerouslySetInnerHTML={{ __html: purifiedHtml }}></div>;
};

export default Markdown;

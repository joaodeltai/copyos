import { useMemo } from 'react';

const markdownRules = [
  { regex: /^### (.*$)/gim, replace: '<h3>$1</h3>' },
  { regex: /^## (.*$)/gim, replace: '<h2>$1</h2>' },
  { regex: /^# (.*$)/gim, replace: '<h1>$1</h1>' },
  { regex: /^> (.*$)/gim, replace: '<blockquote>$1</blockquote>' },
  { regex: /\*\*(.*)\*\*/gim, replace: '<strong>$1</strong>' },
  { regex: /\*(.*)\*/gim, replace: '<em>$1</em>' },
  { regex: /`([^`]+)`/gim, replace: '<code>$1</code>' },
  { regex: /\n\n/gim, replace: '<br />' },
];

export default function MarkdownContent({ content }: { content: string }) {
  const html = useMemo(() => {
    let output = content;
    markdownRules.forEach(({ regex, replace }) => {
      output = output.replace(regex, replace);
    });
    return output;
  }, [content]);

  return (
    <div
      style={{
        lineHeight: 1.6,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

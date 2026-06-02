"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative group my-4">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition hover:text-zinc-200"
      >
        {copied ? "Copiado!" : "Copiar"}
      </button>

      <SyntaxHighlighter
        style={dracula}
        language={lang}
        PreTag="div"
        className="rounded-lg border border-zinc-800 text-sm overflow-x-auto"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export function MD({ md }: { md: string }) {
  return (
    <div className="text-zinc-400 text-sm leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const code = String(children).replace(/\n$/, "");

            return match ? (
              <CodeBlock code={code} lang={match[1]} />
            ) : (
              <code
                className="bg-zinc-900 border border-zinc-800 text-zinc-300 rounded px-1.5 py-0.5 text-xs font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold text-zinc-100 mb-4 mt-6 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-semibold text-zinc-100 mb-3 mt-5 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold text-zinc-200 mb-2 mt-4 tracking-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-semibold text-zinc-200 mb-2 mt-4 tracking-tight">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-lg font-semibold text-zinc-200 mb-2 mt-4 tracking-tight">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-base font-medium text-zinc-200 mb-2 mt-4 tracking-tight">
              {children}
            </h6>
          ),

          p: ({ children }) => (
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-sm text-zinc-400 leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-zinc-700 pl-4 my-4 text-sm text-zinc-500 italic">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              className="text-primary underline underline-offset-4 hover:text-white transition-colors"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-lg border border-zinc-800 max-w-full h-auto my-4"
            />
          ),
          hr: () => <hr className="border-zinc-800 my-6" />,
          strong: ({ children }) => (
            <strong className="text-zinc-200 font-semibold">{children}</strong>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm border border-zinc-800 rounded-lg">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left text-zinc-300 font-semibold border-b border-zinc-800 bg-zinc-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-zinc-400 border-b border-zinc-800">
              {children}
            </td>
          ),
        }}
      >
        {md}
      </ReactMarkdown>
    </div>
  );
}

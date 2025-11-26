"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Components } from "react-markdown";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  content: string;
  className?: string;
  size?: "sm" | "lg";
  enableImageUpload?: boolean;
};

export default function MarkdownPreview({
  content,
  className = "",
  size = "lg",
  enableImageUpload = false,
}: Props) {
  const [copiedBlocks, setCopiedBlocks] = useState<Record<string, boolean>>({});
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});

  const handleCopy = (text: string, codeId: string) => {
    setCopiedBlocks((prev) => ({
      ...prev,
      [codeId]: true,
    }));

    navigator.clipboard.writeText(text);
    toast.success("Code copied to clipboard!");

    if (timeoutRefs.current[codeId]) {
      clearTimeout(timeoutRefs.current[codeId]);
    }

    timeoutRefs.current[codeId] = setTimeout(() => {
      setCopiedBlocks((prev) => ({
        ...prev,
        [codeId]: false,
      }));
    }, 1000);
  };

  const isLarge = size === "lg";

  const customComponents: Components = {
    h1: ({ ...props }) => (
      <h1
        className={`${
          isLarge ? "text-4xl mb-6 mt-8" : "text-3xl mb-4 mt-6"
        } font-bold text-primary`}
        {...props}
      />
    ),
    h2: ({ ...props }) => (
      <h2
        className={`${
          isLarge ? "text-3xl mt-8 mb-4" : "text-2xl mt-6 mb-3"
        } font-semibold text-primary`}
        {...props}
      />
    ),
    h3: ({ ...props }) => (
      <h3
        className={`${
          isLarge ? "text-2xl mt-6 mb-3" : "text-xl mt-5 mb-2"
        } font-semibold text-primary/80`}
        {...props}
      />
    ),
    h4: ({ ...props }) => (
      <h4
        className={`${
          isLarge ? "text-xl mt-5 mb-2" : "text-lg mt-4 mb-2"
        } font-semibold text-primary/70`}
        {...props}
      />
    ),
    h5: ({ ...props }) => (
      <h5
        className={`${
          isLarge ? "text-lg mt-4 mb-2" : "text-base mt-3 mb-2"
        } font-semibold text-primary/60`}
        {...props}
      />
    ),
    h6: ({ ...props }) => (
      <h6
        className={`${
          isLarge ? "text-base mt-4 mb-2" : "text-sm mt-3 mb-2"
        } font-semibold text-primary/50`}
        {...props}
      />
    ),

    p: ({ ...props }) => (
      <p
        className={`${isLarge ? "text-lg" : "text-base"} text-foreground mb-4`}
        {...props}
      />
    ),
    a: ({ ...props }) => (
      <a
        className="text-primary hover:text-primary/80 underline transition-colors"
        {...props}
      />
    ),
    strong: ({ ...props }) => (
      <strong className="font-bold text-primary" {...props} />
    ),
    em: ({ ...props }) => (
      <em className="italic text-foreground/80" {...props} />
    ),
    del: ({ ...props }) => (
      <del className="line-through text-muted-foreground" {...props} />
    ),
    hr: () => (
      <hr className={`${isLarge ? "my-8" : "my-6"} border-t border-border`} />
    ),

    ul: ({ ...props }) => (
      <ul
        className={`list-disc list-outside pl-6 ${
          isLarge ? "mb-6" : "mb-4"
        } text-foreground space-y-1`}
        {...props}
      />
    ),
    ol: ({ ...props }) => (
      <ol
        className={`list-decimal list-outside pl-6 ${
          isLarge ? "mb-6" : "mb-4"
        } text-foreground space-y-1`}
        {...props}
      />
    ),
    li: ({ ...props }) => <li className="mb-1" {...props} />,

    blockquote: ({ ...props }) => (
      <blockquote
        className={`pl-4 italic border-l-4 border-primary/30 text-foreground/80 ${
          isLarge ? "my-6" : "my-4"
        } py-1`}
        {...props}
      />
    ),

    table: ({ ...props }) => (
      <div className={`overflow-x-auto ${isLarge ? "my-6" : "my-4"}`}>
        <table
          className="min-w-full border-collapse border border-border"
          {...props}
        />
      </div>
    ),
    thead: ({ ...props }) => <thead className="bg-muted" {...props} />,
    tbody: ({ ...props }) => (
      <tbody className="divide-y divide-border" {...props} />
    ),
    tr: ({ ...props }) => <tr className="even:bg-muted/30" {...props} />,
    th: ({ ...props }) => (
      <th
        className={`px-4 ${
          isLarge ? "py-3" : "py-2"
        } text-left font-semibold text-foreground border border-border`}
        {...props}
      />
    ),
    td: ({ ...props }) => (
      <td
        className={`px-4 ${
          isLarge ? "py-3" : "py-2"
        } text-foreground border border-border`}
        {...props}
      />
    ),

    code: ({ className, children, ...props }) => {
      const isInline = !className?.includes("language-");

      if (isInline) {
        return (
          <code
            className="bg-muted text-foreground rounded px-1 py-0.5 text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }

      const codeContent = children as string;
      const codeId =
        typeof codeContent === "string"
          ? `code-${codeContent.substring(0, 20).replace(/\s/g, "-")}`
          : `code-${Math.random().toString(36).substring(2, 10)}`;

      const language = className ? className.replace("language-", "") : "";
      const isCopied = copiedBlocks[codeId] || false;

      const displayLanguage = language ? (
        <div className="bg-muted/80 text-xs px-3 py-1 rounded-t border-t border-x border-border flex items-center justify-between">
          {language}
          <button
            className="cursor-pointer"
            onClick={() => handleCopy(codeContent, codeId)}
          >
            {isCopied ? (
              <Check className="w-4 stroke-green-400" />
            ) : (
              <Copy className="w-4" />
            )}
          </button>
        </div>
      ) : null;

      return (
        <div className={isLarge ? "my-6" : "my-4"}>
          {displayLanguage}
          <pre
            className={`bg-muted text-foreground rounded-${
              language ? "b" : ""
            } p-4 text-sm font-mono overflow-x-auto border border-border`}
          >
            <code className="block" {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    },

    img: ({ src, alt, ...props }) => {
      if (
        !src ||
        (typeof src === "string" && src.startsWith("http")) ||
        !enableImageUpload
      ) {
        return (
          <img
            src={src || ""}
            alt={alt || ""}
            className="rounded-lg my-6 max-w-full h-auto"
            {...props}
          />
        );
      }

      const { width, height, ...imageProps } = props;

      return (
        <div
          className={`relative ${
            isLarge ? "my-6 h-[300px] md:h-[400px]" : "my-4 h-[200px]"
          } w-full`}
        >
          <Image
            src={src as string}
            alt={alt || ""}
            fill
            className="rounded-lg object-contain"
            {...imageProps}
          />
        </div>
      );
    },

    input: ({ type, checked, ...props }) => {
      if (type === "checkbox") {
        return (
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className="mr-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            {...props}
          />
        );
      }
      return <input type={type} {...props} />;
    },

    sup: ({ ...props }) => <sup className="text-xs" {...props} />,
    sub: ({ ...props }) => <sub className="text-xs" {...props} />,
    kbd: ({ ...props }) => (
      <kbd
        className="px-1.5 py-0.5 text-xs font-semibold text-foreground bg-muted border border-border rounded shadow-sm"
        {...props}
      />
    ),
    mark: ({ ...props }) => (
      <mark
        className="bg-yellow-100 px-0.5 rounded dark:bg-yellow-800/30"
        {...props}
      />
    ),
    abbr: ({ ...props }) => (
      <abbr className="cursor-help underline decoration-dotted" {...props} />
    ),
  };

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={customComponents}>
        {content || "*Preview will appear here...*"}
      </ReactMarkdown>
    </div>
  );
}

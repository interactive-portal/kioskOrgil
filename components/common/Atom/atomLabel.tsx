import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import BlockDiv from "@/components/common/Block/BlockDiv";

export default function AtomSpinV2({
  label,
  children,
}: {
  label: {
    title?: string;
    outerClassName?: string;
    outerStyle?: Object;
    className?: string;
    style?: Object;
  };
  children: any;
}) {
  if (!label?.title) return children;

  return (
    <BlockDiv
      className={label?.outerClassName}
      style={label?.outerStyle}
      divNumber="AtomLabelOuter"
    >
      <BlockDiv
        type="span"
        className={label?.className}
        style={label?.style}
        divNumber="AtomLabelInner"
      >
        {/* <ReactMarkdown
          children={label?.title}
          rehypePlugins={[rehypeRaw]}
          components={{ p: React.Fragment }}
        /> */}
        {label?.title}
      </BlockDiv>
      {children}
    </BlockDiv>
  );
}

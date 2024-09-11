import React from "react";
import _ from "lodash";
import { decode } from "html-entities";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlockDiv from "@/components/common/Block/BlockDiv";

export default function AtomTextV2({
  item,
  type = "markdown",
  color = "cozy",
  theme,
  onMouseEnter,
  customClassName = "",
  customStyle,
  truncateRow = 0,
  maxLength = 9007199254740991,
  onClick = null,
  showSample = false,
  customDivNumber = "DivText",
  divNamePrefix = "",
  children,
  id,
}: {
  item: any;
  type?: "markdown" | "html";
  link?: string;
  color?: string;
  theme?: any;
  onMouseEnter?: any;
  customStyle?: any;
  customClassName?: string;
  truncateRow?: number;
  maxLength?: number;
  onClick?: any;
  showSample?: boolean;
  customDivNumber?: string;
  divNamePrefix?: string;
  children?: any;
  id?: string;
}) {
  const value: string | undefined = !showSample ? item?.value : "Sample Text";
  const valueClassName = item?.className || "";

  //main хэсэг эхэлж байна.
  if (_.isEmpty(value)) return null;

  const valueReady = decode(String(value).substring(0, maxLength));

  return (
    <BlockDiv
      customClassName={`${customClassName} ${valueClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}${customDivNumber}`}
      type="span"
      onClick={onClick}
      id={id}
    >
      <span className={`line-clamp-${truncateRow}`} onMouseEnter={onMouseEnter}>
        {type === "markdown" ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {valueReady}
          </ReactMarkdown>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: valueReady }} />
        )}

        {children}
      </span>
    </BlockDiv>
  );
}

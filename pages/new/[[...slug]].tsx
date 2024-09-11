// import DataJson from "./public/page.json"
import { json } from "stream/consumers";
import { CodeBlock, dracula } from "react-code-blocks";
import page from "../../public/page.json";

export default function Page(props: any) {
  const { mergedPageNemgoo } = props;
  return (
    <div className={`h-screen`}>
      <pre>
        <CodeBlock
          text={JSON.stringify(page, null, 4)}
          showLineNumbers={true}
          theme={dracula}
          //   codeBlock
        />
      </pre>
    </div>
  );
}

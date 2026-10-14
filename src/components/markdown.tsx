import ReactMarkdown from "react-markdown";

const needsSplit = /(\[needs[^\]]*\])/gi;
const needsStart = /^\[needs/i;

type MarkdownNode = {
  type: string;
  value?: string;
  children?: MarkdownNode[];
  data?: Record<string, unknown>;
};

function needsMarkers() {
  return (tree: MarkdownNode) => {
    function visit(node: MarkdownNode) {
      if (!node.children) {
        return;
      }
      node.children = node.children.flatMap((child) => {
        if (child.type !== "text" || !child.value) {
          visit(child);
          return [child];
        }
        return child.value
          .split(needsSplit)
          .filter(Boolean)
          .map((value) => {
            if (!needsStart.test(value)) {
              return { type: "text", value };
            }
            return {
              type: "needs",
              data: {
                hName: "mark",
                hProperties: { "data-needs": "" },
                hChildren: [{ type: "text", value }],
              },
            };
          });
      });
    }
    visit(tree);
  };
}

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[needsMarkers]}>{children}</ReactMarkdown>
  );
}

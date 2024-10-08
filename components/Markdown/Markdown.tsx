import classNames from "classnames"
import Link from "next/link"
import { HTMLAttributes } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { Details } from "../Details"
import { ImagePreview } from "../ImagePreview"

export interface MarkdownProps extends HTMLAttributes<HTMLDivElement> {
  children: string
}

const Markdown = (attrs: MarkdownProps) => {
  const content = attrs.children.replace(
    /#\[img-group\]\(([\s\S]*?\))([\s\S]*?)([\s\S]*?\))([\s\S]*?)\)/g,
    (_match, g1: string, _g2: string, g3: string, _g4: string) => {
      const imageOne = /!\[[^\]]*\]\((.*?)\)/g.exec(g1)?.[1]
      const imageTwo = /!\[[^\]]*\]\((.*?)\)/g.exec(g3)?.[1]

      return (
        "<div class=\"grid grid-cols-2 gap-2\">" + "\n" +
        `<img src="${imageOne}" alt="">` + "\n" +
        `<img src="${imageTwo}" alt="">` + "\n" +
        "</div>"
      )
    })

  return (
    <div
      {...attrs}
      className={classNames(
        attrs.className,
        // prose 和它的夜间模式
        "prose dark:prose-invert",
        // 表格内容边距
        "prose-th:px-4 prose-th:py-1 prose-td:px-4 prose-td:py-1",
        // 表格底色
        "prose-table:bg-lightBackground dark:prose-table:bg-DarkBackground",
        // 表头描边
        "prose-th:border prose-th:border-border",
        // 表内容描边
        "prose-td:border prose-td:border-border",
        // 双数行背景变色
        "even:prose-tr:bg-border/10",
      )}
    >
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
        ]}
        rehypePlugins={[
          rehypeRaw,
          rehypeHighlight,
        ]}
        components={{
          img({ src, alt }) {
            return src ? (
              <ImagePreview
                src={
                  src.startsWith("https://resources.mmixel.com")
                    ? src
                    : "/default_image.png"
                }
                alt={alt || ""}
                width={1920}
                height={1080}
                className="rounded-lg my-2 border border-border"
              />
            ) : null
          },
          a({ href, children }) {
            return href
              ? <Link href={
                (href.startsWith("/") && !href.startsWith("//"))
                  ? href
                  : `/extra?url=${href}`
              } target="_blank">{children}</Link>
              : null
          },
          details({ children }) {
            return <Details>{children}</Details>
          },
          summary() { return null },
          iframe() { return null },

          h1(props) {
            return (
              <h1 id={encodeURI(props.children as string).toLowerCase()}>
                {props.children}
              </h1>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown

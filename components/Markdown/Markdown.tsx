import classNames from "classnames"
import Link from "next/link"
import ReactMarkdown, { Options as ReactMarkdownOptions } from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { Details } from "../Details"
import { ImagePreview } from "../ImagePreview"

export interface MarkdownProps extends ReactMarkdownOptions {
  children: string
  trustHosts?: string[]
  defaultImage?: string
}

const Markdown = ({
  defaultImage = '/default_image.png',
  ...attrs
}: MarkdownProps) => {
  return (
    <ReactMarkdown
      {...attrs}
      remarkPlugins={[
        remarkGfm,
      ]}
      rehypePlugins={[
        rehypeRaw,
        rehypeHighlight,
      ]}
      components={{
        img(props) {
          const host = new URL(props.src || "").host
          // trust hosts
          const src = attrs.trustHosts?.includes(host) ? props.src : defaultImage

          return (
            <div className="space-x-2">
              <ImagePreview
                {...props}
                src={src || ""}
                alt={props.alt || ""}
                width={1920}
                height={1080}
                className="rounded-lg my-2 border border-border"
              />
              {props.alt && <p className="text-center text-sm text-tip">{props.alt}</p>}
            </div>
          )
        },
        a({ href, children }) {
          return href
            ? <Link href={`/extra?url=${href}`} target="_blank">{children}</Link>
            : null
        },
        details({ children }) {
          return <Details>{children}</Details>
        },
        summary() { return null },
        iframe() { return null },
        h1(props) {
          return (
            <h1
              id={typeof props.children === 'string' ? encodeURI((props.children as string).match(/(?<=#)$$(.*?)$$/g)?.[0] || "").toLowerCase() : void 0}
              className={classNames(props.className, 'scroll-mt-16')}
            >
              {props.children}
            </h1>
          )
        },
        h2(props) {
          return (
            <h2
              id={typeof props.children === 'string' ? encodeURI((props.children as string).match(/(?<=#)$$(.*?)$$/g)?.[0] || "").toLowerCase() : void 0}
              className={classNames(props.className, 'scroll-mt-16')}
            >
              {props.children}
            </h2>
          )
        },
        h3(props) {
          return (
            <h3
              id={typeof props.children === 'string' ? encodeURI((props.children as string).match(/(?<=#)$$(.*?)$$/g)?.[0] || "").toLowerCase() : void 0}
              className={classNames(props.className, 'scroll-mt-16')}
            >
              {props.children}
            </h3>
          )
        },
        h4(props) {
          return (
            <h4
              id={typeof props.children === 'string' ? encodeURI((props.children as string).match(/(?<=#)$$(.*?)$$/g)?.[0] || "").toLowerCase() : void 0}
              className={classNames(props.className, 'scroll-mt-16')}
            >
              {props.children}
            </h4>
          )
        },
        h5(props) {
          return (
            <h5
              id={typeof props.children === 'string' ? encodeURI((props.children as string).match(/(?<=#)$$(.*?)$$/g)?.[0] || "").toLowerCase() : void 0}
              className={classNames(props.className, 'scroll-mt-16')}
            >
              {props.children}
            </h5>
          )
        },
        h6(props) {
          return (
            <h6
              id={typeof props.children === 'string' ? encodeURI((props.children as string).match(/(?<=#)$$(.*?)$$/g)?.[0] || "").toLowerCase() : void 0}
              className={classNames(props.className, 'scroll-mt-16')}
            >
              {props.children}
            </h6>
          )
        },
      }}
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
      {attrs.children}
    </ReactMarkdown>
  )
}

export default Markdown

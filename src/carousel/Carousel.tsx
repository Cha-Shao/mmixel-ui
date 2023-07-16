"use client"
import classNames from "classnames"
import {
  Children,
  ForwardedRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useRef,
  useState
} from "react"
import Button from "../button/Button"
import Icon, { LeftArrow, RightArrow } from "../icon/Icon"

interface Props extends
  PropsWithChildren,
  HTMLAttributes<HTMLDivElement> {
  autoplay?: boolean
  interval?: number
  delay?: number
  duration?: number

  forcePage?: number

  arrowLeft?: ReactElement
  arrowRight?: ReactElement
  dots?: ReactElement
  dotActive?: ReactElement
  dotDefault?: ReactElement
}

const Carousel = forwardRef(function Carousel(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { delay = 0, duration = 300 } = props
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(0)
  const [intervalId, setIntervalId] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextPage = () => {
    setPage(prevPage => (prevPage + 1) % maxPage)
  }
  const prevPage = () => {
    page - 1 < 0 ? setPage(maxPage - 1) : setPage(prevPage => prevPage - 1)
  }

  const clearAutoplay = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
      return
    }
  }
  const setAutoplay = () => {
    clearAutoplay()
    const thisIntervalId = setInterval(() => {
      nextPage()
    }, props.interval || 7000)
    setIntervalId(thisIntervalId)
  }
  useEffect(() => {
    setMaxPage(carouselRef.current?.getElementsByTagName("div").length || 0)
    props.autoplay && setAutoplay()
    return () => {
      clearAutoplay()
    }
  }, [props.children])

  return (
    <div className="relative">
      {/* 轮播区域 */}
      <div ref={ref}
        className={classNames(
          "m-carousel",
          props.className,
          "overflow-hidden",
        )}
        onMouseEnter={() => { props.autoplay && clearAutoplay() }}
        onMouseLeave={() => { props.autoplay && setAutoplay() }}
      >
        <div ref={carouselRef} className="m-carousel-container flex h-full w-full" style={{
          transform: `translateX(${(props.forcePage ?? page) * -100}%)`,
          transitionDelay: `${delay}ms`,
          transitionDuration: `${duration}ms`,
        }}>
          {Children.map(props.children, (child, i) => {
            return isValidElement<{ className: string }>(child)
              ? <div key={i} className="m-carousel-children w-full h-full shrink-0">{child}</div>
              : child
          })}
        </div>
      </div>
      {/* 向左箭头 */}
      {(props.forcePage === undefined) && (props.arrowLeft
        ? cloneElement(props.arrowLeft, {
          className: classNames(
            "m-carousel-arrow-left",
            props.arrowLeft.props.className
          ),
          ...props.arrowLeft.props,
          onClick: prevPage
        }) : (
          <Button square type="secondary" size="lg"
            className="!bg-gray-800/20 text-white absolute bottom-6 left-[1.5rem]"
            onClick={prevPage}>
            <Icon icon={LeftArrow} size={64} />
          </Button>
        ))}
      {/* 向右箭头 */}
      {(props.forcePage === undefined) && (props.arrowRight
        ? cloneElement(props.arrowRight, {
          className: classNames(
            "m-carousel-arrow-right",
            props.arrowRight.props.className
          ),
          ...props.arrowRight.props,
          onClick: nextPage
        }) : (
          <Button square type="secondary" size="lg"
            className="!bg-gray-800/20 text-white absolute bottom-6 left-[4.5rem]"
            onClick={nextPage}>
            <Icon icon={RightArrow} size={64} />
          </Button>
        ))}
      {/* 轮播进度 */}
      {!props.forcePage && cloneElement(props.dots
        ? props.dots
        : <div className="m-carousel-dots flex absolute bottom-10 right-6" />,
        { ...props.dots?.props },
        Array(maxPage).fill(null).map((_, i) =>
          i === (props.forcePage ?? page)
            // 高亮进度
            ? props.dotActive
              ? cloneElement(props.dotActive, {
                className: classNames(
                  "m-carousel-dot-action",
                  props.dotActive.props.className,
                ),
                ...props.dotActive.props,
                key: i,
                onClick: () => { setPage(i) }
              })
              : <span
                key={i}
                onClick={() => { setPage(i) }}
                className="m-carousel-dot-action w-2 h-2 rounded-full mx-1 bg-white" />
            // 默认进度
            : props.dotDefault
              ? cloneElement(props.dotDefault, {
                className: classNames(
                  "m-carousel-dot-default",
                  props.dotDefault.props.className
                ),
                ...props.dotDefault.props,
                key: i,
                onClick: () => { setPage(i) }
              })
              : <span
                key={i}
                onClick={() => { setPage(i) }}
                className="m-carousel-dot-action w-2 h-2 rounded-full mx-1 bg-white/50" />))}
    </div>
  )
})

export default Carousel

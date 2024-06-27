"use client"

import { Button } from "../Button"
import { Card } from "../Card"
import { HoverCard } from "../HoverCard"

export interface PaginationProps {
  onChange: (page: number) => void
  page: number
  total: number
  disabled?: boolean
}

const Pagination = ({
  onChange,
  page,
  total,
  disabled = false,
}: PaginationProps) => {
  if (page > total) throw new Error("Page cannot be greater than total")

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        variant="border"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1 || disabled}
      >
        上一页
      </Button>
      {page > 3 && (
        <Button
          variant='border'
          onClick={() => onChange(1)}
          disabled={disabled}
        >
          1
        </Button>
      )}
      {page > 4 && (
        <HoverCard disabled={disabled} trigger={(
          <span className="icon-[ph--dots-three-bold] text-xl mx-2" />
        )}>
          <Card border className="!p-2 shadow">
            <div className="grid max-h-64 overflow-y-auto">
              {[...Array(page - 1 - 3)].map((_, i) => {
                const currentPage = i + 2

                return (
                  <Button
                    key={currentPage}
                    variant='ghost'
                    className="justify-center"
                    onClick={() => onChange(currentPage)}
                  >
                    {currentPage}
                  </Button>
                )
              })}
            </div>
          </Card>
        </HoverCard>
      )}
      {[...Array(2)].map((_, i) => {
        const currentPage = page - (3 - (i + 1))

        return currentPage >= 1 && (
          <Button
            key={currentPage}
            variant='border'
            onClick={() => onChange(currentPage)}
          >
            {currentPage}
          </Button>
        )
      })}
      <Button variant="primary">
        {page}
      </Button>
      {[...Array(2)].map((_, i) => {
        const currentPage = page + (i + 1)

        return currentPage <= total && (
          <Button
            key={currentPage}
            variant='border'
            disabled={disabled}
            onClick={() => onChange(currentPage)}
          >
            {currentPage}
          </Button>
        )
      })}
      {page < total - 3 && (
        <HoverCard disabled={disabled} trigger={(
          <span className="icon-[ph--dots-three-bold] text-xl mx-2" />
        )}>
          <Card border className="!p-2 shadow">
            <div className="grid max-h-64 overflow-y-auto">
              {[...Array(total - page - 3)].map((_, i) => {
                const currentPage = page + 2 + (i + 1)

                return (
                  <Button
                    key={currentPage}
                    variant='ghost'
                    className="justify-center"
                    onClick={() => onChange(currentPage)}
                  >
                    {currentPage}
                  </Button>
                )
              })}
            </div>
          </Card>
        </HoverCard>
      )}
      {page < total - 2 && (
        <Button
          variant='border'
          disabled={disabled}
          onClick={() => onChange(total)}
        >
          {total}
        </Button>
      )}
      <Button
        variant="border"
        onClick={() => onChange(page + 1)}
        disabled={page >= total || disabled}
      >
        下一页
      </Button>
    </div>
  )
}

export default Pagination

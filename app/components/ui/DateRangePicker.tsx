import React from 'react'
import { isBefore, isValid, parse } from 'date-fns'
import DatePickerPopover from './DatePickerPopover'

interface DateRangePickerProps {
  startName: string
  endName: string
  startLabel: string
  endLabel: string
  startValue: string
  endValue: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  startError?: string
  endError?: string
  required?: boolean
  autoDismissPopover?: number
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startName,
  endName,
  startLabel,
  endLabel,
  startValue,
  endValue,
  onChange,
  startError,
  endError,
  required,
  autoDismissPopover = 8000,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row flex-wrap gap-4 md:gap-6">
        <div className="min-w-[200px] flex-1">
          <DatePickerPopover
            name={startName}
            label={startLabel}
            value={startValue}
            onChange={onChange}
            error={startError}
            required={required}
            autoDismissPopover={autoDismissPopover}
          />
        </div>
        <div className="min-w-[200px] flex-1">
          <DatePickerPopover
            name={endName}
            label={endLabel}
            value={endValue}
            onChange={onChange}
            error={endError}
            required={required}
            autoDismissPopover={autoDismissPopover}
          />
        </div>
      </div>
    </div>
  )
}

export default DateRangePicker

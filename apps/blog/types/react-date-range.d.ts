import "react-date-range"

declare module "react-date-range" {
    export interface DateRangeProps extends Range, CommonCalendarProps {
        retainEndDateOnFirstSelection?: boolean | undefined
    }
}

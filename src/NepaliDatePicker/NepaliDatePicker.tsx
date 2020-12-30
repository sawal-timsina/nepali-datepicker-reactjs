import { ADToBS } from "bikram-sambat-js"
import React, { FunctionComponent, useCallback, useEffect, useState } from "react"
import { Calender } from "./Calender"
import { useConfig } from "./Config"
import { useTrans } from "./Locale"
import { ENGLISH, INepaliDatePicker, localeType, NepaliDatepickerEvents } from "./Types"
import { executionDelegation, stitchDate } from "./Utils/common"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"

const NepaliDatePicker: FunctionComponent<INepaliDatePicker> = (props) => {
    const { value, onChange, onSelect, options, pickerPlacement, ...other } = props

    const [date, setDate] = useState<string>("")
    const [showCalendar, setShowCalendar] = useState<boolean>(false)

    const { setConfig, getConfig } = useConfig()
    const { numberTrans } = useTrans(getConfig<localeType>("currentLocale"))

    const toEnglish = useCallback((val: string): string => numberTrans(val, ENGLISH), [])
    const returnDateValue = useCallback((val: string): string => numberTrans(val, options.valueLocale), [
        options.valueLocale,
    ])

    useEffect(() => {
        setConfig("currentLocale", options.calenderLocale)
    }, [options.calenderLocale])

    useEffect(() => {
        setDate(toEnglish(value || ADToBS(new Date())))
    }, [value])

    const handleOnChange = useCallback((changedDate: string) => {
        executionDelegation(
            () => {
                setDate(changedDate)
            },
            () => {
                if (onChange) {
                    onChange(returnDateValue(changedDate))
                }
            },
        )
    }, [])

    const handleOnDaySelect = useCallback((selectedDate) => {
        executionDelegation(
            () => {
                if (options.closeOnSelect) {
                    setShowCalendar(false)
                }
            },
            () => {
                if (onSelect) {
                    onSelect(returnDateValue(stitchDate(selectedDate)))
                }
            },
        )
    }, [])

    const datepickerEvents: NepaliDatepickerEvents = {
        change: handleOnChange,
        daySelect: handleOnDaySelect,
        todaySelect: handleOnDaySelect,
    }

    return (
        <Tippy
            onClickOutside={() => {
                setShowCalendar(false)
            }}
            appendTo={() => document.body}
            className='tippy-container'
            visible={showCalendar}
            arrow={false}
            interactive
            placement={pickerPlacement}
            content={<Calender value={date} events={datepickerEvents} />}
        >
            <input
                {...other}
                type='text'
                readOnly
                value={numberTrans(date)}
                onClick={() => setShowCalendar((visible) => !visible)}
            />
        </Tippy>
    )
}

export default NepaliDatePicker

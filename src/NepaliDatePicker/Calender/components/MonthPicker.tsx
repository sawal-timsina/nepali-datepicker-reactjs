import React, { FunctionComponent, useMemo, useState } from "react"
import { CalenderData, useConfig } from "../../Config"
import { DropDown, OptionType } from "../../DropDown"
import { localeType, ParsedDate } from "../../Types"
import Tippy from "@tippyjs/react"

interface MonthPickerProps {
    date: ParsedDate
    onSelect: (year: number) => void
}

const MonthPicker: FunctionComponent<MonthPickerProps> = ({ date, onSelect }) => {
    const [showDropdown, setShowDropdown] = useState(false)

    const { getConfig } = useConfig()
    const currentLocale: localeType = useMemo(() => getConfig<localeType>("currentLocale"), [getConfig])

    const currentMonth: OptionType = useMemo((): OptionType => {
        const month = date.bsMonth

        return {
            label: CalenderData.months[currentLocale][month - 1],
            value: month,
        }
    }, [date, currentLocale])

    const monthList: OptionType[] = useMemo(() => {
        return CalenderData.months[currentLocale].map((month, index) => ({
            label: month,
            value: index + 1,
        }))
    }, [currentLocale])

    const handleDropdownView = (selected: OptionType) => {
        setShowDropdown(!showDropdown)
        onSelect(selected.value)
    }

    return (
        <div className='control month'>
            <Tippy
                onClickOutside={() => {
                    setShowDropdown(false)
                }}
                className='tippy-container'
                visible={showDropdown}
                arrow={false}
                interactive
                placement={"bottom-start"}
                offset={[-1, -33]}
                content={
                    <DropDown
                        className={"left"}
                        options={monthList}
                        value={currentMonth.value}
                        onSelect={handleDropdownView}
                    />
                }
            >
                <span className='current-month' onClick={() => setShowDropdown(!showDropdown)}>
                    {currentMonth.label}
                </span>
            </Tippy>
        </div>
    )
}

export default MonthPicker

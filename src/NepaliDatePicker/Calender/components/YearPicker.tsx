import React, { FunctionComponent, useMemo, useState } from "react"
import { useConfig } from "../../Config"
import { DropDown, OptionType } from "../../DropDown"
import { useTrans } from "../../Locale"
import { localeType, ParsedDate } from "../../Types"
import { range } from "../../Utils/common"
import Tippy from "@tippyjs/react"

interface YearPickerProps {
    date: ParsedDate
    onSelect: (year: number) => void
}

const YearPicker: FunctionComponent<YearPickerProps> = ({ date, onSelect }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const { getConfig } = useConfig()
    const { numberTrans } = useTrans(getConfig<localeType>("currentLocale"))

    const currentYear: OptionType = useMemo((): OptionType => {
        const year = date.bsYear

        return {
            label: numberTrans(year),
            value: year,
        }
    }, [date])

    const years: OptionType[] = useMemo(
        (): OptionType[] =>
            range(2000, 2080)
                .reverse()
                .map(
                    (year: number): OptionType => ({
                        label: numberTrans(year),
                        value: year,
                    }),
                ),
        [],
    )

    const handleDropdownView = (selected: OptionType) => {
        setShowDropdown(!showDropdown)
        onSelect(selected.value)
    }

    return (
        <div className='control year'>
            <Tippy
                onClickOutside={() => {
                    setShowDropdown(false)
                }}
                className='tippy-container'
                visible={showDropdown}
                arrow={false}
                interactive
                placement={"bottom-end"}
                offset={[1, -33]}
                content={
                    <DropDown
                        className={"right"}
                        options={years}
                        value={currentYear.value}
                        onSelect={handleDropdownView}
                    />
                }
            >
                <span className='current-year' onClick={() => setShowDropdown(!showDropdown)}>
                    {currentYear.label}
                </span>
            </Tippy>
        </div>
    )
}

export default YearPicker

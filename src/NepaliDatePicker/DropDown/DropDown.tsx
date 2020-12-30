import React, { FunctionComponent } from "react"
import { OptionType } from "./Types"

interface DropDownProps {
    className: string
    options: OptionType[]
    value: number
    onSelect: (selected: OptionType) => void
}

const DropDown: FunctionComponent<DropDownProps> = ({ options, value, onSelect, className }) => {
    return (
        <div className={`drop-down ${className}`}>
            <div className='option-wrapper'>
                <ul>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className={option.value === value ? "active" : ""}
                            onClick={() => {
                                onSelect(option)
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DropDown

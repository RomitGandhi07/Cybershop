import { UserTypesEnum } from "@/enums/user-types.enum"
import React from "react";
import { FaBriefcase, FaLaptopCode } from 'react-icons/fa';

interface IProps {
    type: UserTypesEnum
    selected: boolean
    onSelect: Function
}
const UserTypeSelectionCard: React.FC<IProps> = ({type, selected, onSelect}) => {
    console.info("HERE", type);
    return (
        <div
            className={`block w-[220px] p-4 border rounded-lg cursor-pointer hover:bg-orange-50 transition duration-200
                            ${selected
                    ? "border-orange-600"
                    : "border-gray-300"
                }`}
            onClick={() => onSelect(type)}
        >
            <div className="flex items-center justify-between">
                <div className="text-gray-900">
                    {
                        type === UserTypesEnum.CLIENT ?
                        <FaBriefcase className="text-2xl" /> :
                        <FaLaptopCode className="text-2xl" />
                    }
                    
                </div>
                <div
                    className={`w-4 h-4 border rounded-full flex items-center justify-center
                                    ${selected
                            ? "border-orange-600"
                            : "border-gray-400"
                        }`}
                >
                    {selected && (
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    )}
                </div>
            </div>
            <div className="mt-4 text-left">
                <span
                    className={`font-medium ${selected ? "text-gray-900" : "text-gray-900"
                        }`}
                >
                    { type === UserTypesEnum.CLIENT ? "I’m a client, looking for help" : "I’m a service provider, providing cyber services"}
                </span>
            </div>
        </div>
    )
}

export default React.memo(UserTypeSelectionCard);
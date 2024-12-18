'use client';
import React, { useState } from 'react';
import { Tag } from '../../models/TagModel';

export const MultiSelect: React.FC<{
    options: Tag[];
    selectedOptions: string[];
    onChange: (selected: string[]) => void;
}> = ({ options, selectedOptions, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option: string) => {
        if (selectedOptions.includes(option)) {
            onChange(selectedOptions.filter(item => item !== option));
        } else {
            onChange([...selectedOptions, option]);
        }
    };

    return (
        <div className="relative w-full">
            <div
                className="my-2 p-1 flex border border-gray-200 bg-white rounded cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-auto flex-wrap">
                    {selectedOptions.map((option, index) => (
                        <div
                            key={index}
                            className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300"
                        >
                            <div className="text-xs font-normal leading-none max-w-full flex-initial">
                                {option}
                            </div>
                            <div className="flex flex-auto flex-row-reverse">
                                <div onClick={() => handleSelect(option)}>
                                    <svg
                                        className="fill-current h-6 w-6"
                                        role="button"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M14.348,14.849c-0.469,0.469-1.229,0.469-1.697,0L10,11.819l-2.651,3.029c-0.469,0.469-1.229,0.469-1.697,0
                                            c-0.469-0.469-0.469-1.229,0-1.697l2.758-3.15L5.651,6.849c-0.469-0.469-0.469-1.228,0-1.697s1.228-0.469,1.697,0L10,8.183
                                            l2.651-3.031c0.469-0.469,1.228-0.469,1.697,0s0.469,1.229,0,1.697l-2.758,3.152l2.758,3.15
                                            C14.817,13.62,14.817,14.38,14.348,14.849z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex-1">
                        <input
                            placeholder="Select a option"
                            className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                            readOnly
                        />
                    </div>
                </div>
                <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                    <button
                        type="button"
                        className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                    >
                        <svg
                            className={`fill-current h-4 w-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                            viewBox="0 0 20 20"
                        >
                            <path d="M17.418,6.109c0.272-0.268,0.709-0.268,0.979,0s0.271,0.701,0,0.969l-7.908,7.83
                                c-0.27,0.268-0.707,0.268-0.979,0l-7.908-7.83c-0.27-0.268-0.27-0.701,0-0.969c0.271-0.268,0.709-0.268,0.979,0L10,13.25
                                L17.418,6.109z" />
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="absolute shadow top-100 bg-white z-50 w-full left-0 rounded max-h-60 overflow-y-auto">
                    <div className="flex flex-col w-full">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
                                onClick={() => handleSelect(option.name)}
                            >
                                <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative">
                                    <div className="w-full items-center flex">
                                        <div className="mx-2 leading-6">{option.name}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
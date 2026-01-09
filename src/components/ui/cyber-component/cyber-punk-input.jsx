import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const CyberpunkInput = ({
    label,
    type = 'text',
    placeholder = '',
    icon: Icon,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className="relative w-full mb-6 font-mono">
            {label && (
                <label className={`
                    absolute -top-6 left-0 text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300
                    ${isFocused ? 'text-emerald-400' : 'text-slate-500'}
                `}>
                    {label}
                </label>
            )}

            <div className="relative group">
                <input
                    type={inputType}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className={`
                        w-full bg-slate-950/50 border-b-2 text-white px-4 py-3 outline-none transition-all duration-300
                        placeholder:text-slate-600
                        ${isFocused
                            ? 'border-emerald-500 shadow-[0_4px_20px_-5px_rgba(6,182,212,0.3)] bg-slate-900/80'
                            : 'border-slate-700 hover:border-slate-500'}
                    `}
                    {...props}
                />

                {Icon && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 text-emerald-600 opacity-50">
                        <Icon size={16} />
                    </div>
                )}

                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}

                <div className={`
                    absolute bottom-0 left-0 h-[2px] bg-emerald-400 transition-all duration-500 ease-out
                    ${isFocused ? 'w-full shadow-[0_0_10px_emerald]' : 'w-0'}
                `} />
            </div>

            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-slate-700 rotate-45 translate-y-[2px] translate-x-[2px]" />
        </div>
    );
};

export default CyberpunkInput;
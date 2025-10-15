import type SelectOptionsDM from "../../../viewModels/SelectsOptionsDM"

export default function Select(
    { label, options, selectValue, emptyText, prefilledValue, ...props }: 
    {label: string, options: SelectOptionsDM[], selectValue: string, emptyText: string, prefilledValue?:string}) {
    const selectClasses = "py-2 px-4 w-full ring-1 ring-stone-300 border-b-2 rounded-lg border-none bg-gray-50 focus:outline-none focus:ring-blue-500";

    return (
        <p className="flex flex-col gap-1 my-4">
            <label className="block font-semibold">{label}</label>
            <select defaultValue={prefilledValue? prefilledValue: ""} className={selectClasses} id={selectValue} name={selectValue} {...props} >
                <option value="" disabled >{emptyText}</option>
                {options.map(o => {
                    return <option key={o.id} id={o.id} value={o.id} >{o.displayName}</option>
                })
                }
            </select>
        </p>
    )
}

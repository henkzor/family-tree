// import { forwardRef } from "react"

export default function Input({ label, id, isTextArea, ...props }: {label: string, id: string, isTextArea: boolean}) { 
const inputClasses = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"

    return (
    <p className="flex flex-col gap-1 my-4"> 
        <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
        {isTextArea ?
         <textarea id={id} name={id} className={inputClasses} required {...props} /> :
         <input id={id} name={id} className={inputClasses} required {...props} />}
    </p>
    )

}
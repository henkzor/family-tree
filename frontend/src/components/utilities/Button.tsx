export default function Button({ buttonText, ...props }: {  buttonText: string; } & React.ButtonHTMLAttributes<HTMLButtonElement>) {

    return (
        <button {...props} className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-200 hover:bg-stone-600 hover:text-stone-100">{buttonText}</button>
    )

}

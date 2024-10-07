import { useContext } from "react"

import { TreeContext } from "../../store/tree-context"
import Button from "../utilities/Button"

export default function Sidebar() {
    const {selectTreeHandler, trees, selectedTreeId, startAddTreeHandler} = useContext(TreeContext)

    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200" >Your family trees</h2>
            <div>
                <Button onClick={startAddTreeHandler} buttonText="+ Add tree" />
            </div>
            <ul className="mt-8">
                {trees.map(p => {
                    const buttonClasses = p.id === selectedTreeId? 
                    "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-200 bg-stone-800":
                    "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800"

                    return(<li key={p.id}>
                        <button
                            className= {buttonClasses}
                            onClick={() => selectTreeHandler(p.id)}>
                            {p.title}
                        </button>
                    </li>)
                })}

            </ul>
        </aside>)
}
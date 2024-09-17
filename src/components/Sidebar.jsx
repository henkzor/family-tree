import { useContext } from "react"

import { ProjectContext } from "../store/project-context"
import Button from "./utilities/Button"

export default function Sidebar() {
    const {selectProjectHandler, projects, selectedProjectId, startAddProjectHandler} = useContext(ProjectContext)

    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200" >Your projects</h2>
            <div>
                <Button onClick={startAddProjectHandler} buttonText="+ Add project" />
            </div>
            <ul className="mt-8">
                {projects.map(p => {
                    const buttonClasses = p.id === selectedProjectId? 
                    "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-200 bg-stone-800":
                    "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800"

                    return(<li key={p.id}>
                        <button
                            className= {buttonClasses}
                            onClick={() => selectProjectHandler(p.id)}>
                            {p.title}
                        </button>
                    </li>)
                })}

            </ul>
        </aside>)
}
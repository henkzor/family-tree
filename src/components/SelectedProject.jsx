import { useContext } from "react";

import Tasks from "./Tasks"
import { ProjectContext } from "../store/project-context"

export default function SelectedProject() {
    const {selectedProjectId, projects, deleteProjectHandler} = useContext(ProjectContext)

    const project = projects.find(p => p.id === selectedProjectId);

    const formattedDate = new Date(project.dueDate).toLocaleDateString("sv-SE",
        {
            year: 'numeric',
            month: 'short',
            date: 'numeric'
        }
    )

    return (
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
                    <button onClick={() => deleteProjectHandler(project.id)} className="text-stone-600 hover:text-stone-950">DELETE</button>
                </div>
                <p className="mb-4 text-stone-400">{formattedDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
            </header>
            <Tasks />
        </div>
    )

}
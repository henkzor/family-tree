import { useContext } from "react";

import NewTask from "./NewTask";
import { ProjectContext } from "../store/project-context"

export default function Tasks() {

    const {tasks, deleteTaskHandler} = useContext(ProjectContext)

    return (
        <section>
            <h2 className="text-xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask />
            {tasks.length === 0 ?
                <p className="text-stone-800 my-4">This project does not have any tasks yet</p> :
                <ul className="px-4 py-1 mt-8 rounded-md bg-stone-100">
                    {tasks.map(t => (
                        <li key={t.id} className="flex justify-between my-2" > 
                            <span>
                                {t.text}
                            </span>
                            <button className="text-stone-700 hover:text-red-500 " onClick={() => deleteTaskHandler(t.id)}>X</button>
                        </li>

                    ))}
                </ul>}
        </section>
    )

}
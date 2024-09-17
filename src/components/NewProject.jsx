import { useRef, useContext } from "react"

import Input from "./utilities/Input.jsx"
import Modal from "./utilities/Modal.jsx";
import { ProjectContext } from "../store/project-context"


export default function NewProject() {
    const {addNewProjectHandler, cancelAddNewProjectHandler} = useContext(ProjectContext)
    
    const modal = useRef();

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if (
            enteredTitle.trim() === "" ||
            enteredDescription.trim() === "" ||
            enteredDueDate.trim() === ""
        ) {
            modal.current.open()
            return
        }
        else {
            addNewProjectHandler({ title: enteredTitle, description: enteredDescription, dueDate: enteredDueDate });
        }
    }

    return (
        <>
            <Modal ref={modal} buttonText="Close" >
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
                <p className='text-stone-600 mb-4'>Ooops... Looks like you enetered invalid or empty values</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <div>
                    <Input type="text" ref={title} label="Title" />
                    <Input ref={description} isTextArea={true} label="Description" />
                    <Input type="date" ref={dueDate} label="Due date" />
                </div>
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button onClick={cancelAddNewProjectHandler} className="text-stone-800 hover:text-stone-950">Cancel</button>
                    </li>
                    <li>
                        <button onClick={handleSave}
                            className=" px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 ">
                            Save
                        </button>
                    </li>
                </menu>
            </div>
        </>
    )
}
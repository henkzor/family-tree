import { useRef, useContext } from "react"

import Input from "../utilities/Input.js"
import Modal from "../utilities/Modal.jsx";
import Button from "../utilities/Button.js";
import { TreeContext } from "../../store/tree-context.jsx"
import TreeDM from "../../../../models/dataModels/TreeDM.ts";


export default function NewTree() {
    const {addTreeHandler, cancelAddNewTreeHandler} = useContext(TreeContext)
    
    const modal = useRef<any>(null);

    const title = useRef();
    const description = useRef();

    function handleSave(event) {

        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        
        console.log(customerData)
        if (
            (customerData.title as string).trim() === "" ||
            (customerData.description as string).trim() === "" 
        ) {
            modal.current!.open()
            return
        }
        else {
            addTreeHandler( new TreeDM(customerData.title as string, customerData.description as string ));
            // addTreeHandler({ title: enteredTitle, description: enteredDescription});
        }
    }

    return (
        <>
            <Modal ref={modal} buttonText="Close" >
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
                <p className='text-stone-600 mb-4'>Ooops... Looks like you enetered invalid or empty values</p>
            </Modal>
            <form onSubmit={handleSave} className="w-[35rem] mt-16">
                <div>
                    <Input isTextArea={false} type="text" id="title"  label="Title" />
                    <Input isTextArea={true} id="description"  label="Description" />
                    
                </div>
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button onClick={cancelAddNewTreeHandler} className="text-stone-800 hover:text-stone-950">Cancel</button>
                    </li>
                    <li>
                        <Button buttonText="Spara"
                            className=" px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 " />
                    </li>
                </menu>
            </form>
        </>
    )
}
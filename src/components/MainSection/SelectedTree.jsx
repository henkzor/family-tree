import { useContext, useRef } from "react";

import { TreeContext } from "../../store/tree-context"
import FamilyTree from "../FamilyTree/FamilyTree";
import Button from "../utilities/Button";
import NewPerson from "../Person/NewPerson";
import Modal from "../utilities/Modal";

export default function SelectedTree() {
    const {selectedTreeId, trees, deleteTreeHandler} = useContext(TreeContext)

    const modal = useRef();

    const tree = trees.find(p => p.id === selectedTreeId);

    return (
        <div className="w-[35rem] mt-16">
            <Modal ref={modal} buttonText="Stäng" >
                <NewPerson selectedTreeId={selectedTreeId} />
            </Modal>
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">{tree.title}</h1>
                    <button onClick={() => deleteTreeHandler(tree.id)} className="text-stone-600 hover:text-stone-950">DELETE</button>
                </div>
                <p className="text-stone-600 whitespace-pre-wrap">{tree.description}</p>
            </header>
            <Button buttonText="Lägg till person" onClick={() => modal.current.open()} />
            <FamilyTree selectedTreeId={selectedTreeId} />
        </div>
    )

}
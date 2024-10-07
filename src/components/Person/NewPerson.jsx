import { useContext, useRef } from "react";

import { TreeContext } from "../../store/tree-context"
import Input from "../utilities/Input";
import Button from "../utilities/Button";

export default function NewPerson({selectedTreeId}) {

    const {persons, addPersonHandler } = useContext(TreeContext)

    const firstName = useRef();
    const lastName = useRef();
    const birthDate = useRef();
    const description = useRef();

    function addNewPerson() {

        addPersonHandler({
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            birthDate: birthDate.current.value,
            description: description.current.value,
            treeId: selectedTreeId
        })
    }

    return (
        <div className="w-[35rem]">
            <h2>Lägg till person</h2>
            <div>
                <span className="flex">
                    <span >
                        <Input type="text" ref={firstName} label="Förnamn" />
                    </span>
                    <span className="ml-6">
                        <Input type="text" ref={lastName} label="Efternamn" />
                    </span>
                </span>
                <Input type="date" ref={birthDate} label="Födelsedatum" />
                <Input ref={description} isTextArea={true} label="Beskrivning" />
                <Button onClick={addNewPerson} buttonText="Spara" />
            </div>
        </div>
    )

}
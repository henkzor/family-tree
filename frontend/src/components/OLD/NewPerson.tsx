import { useContext} from "react";

import { TreeContext } from "../../store/tree-context.tsx"
import Input from "../utilities/Input.tsx";
import Button from "../utilities/Button.tsx";
import Select from "../utilities/Select.tsx";

import PersonDM from "../../../../models/dataModels/PersonDM.js"

export default function NewPerson({ selectedTreeId }) {

    const { persons, addPersonHandler } = useContext(TreeContext)

    const otherPeopleInTree = persons.filter(p => p.treeId === selectedTreeId)

    const selectOptions = [
        { id: "foralder", displayName: "Förälder till", value: 1 },
        { id: "syskon", displayName: "Syskon till", value: 0 },
        { id: "barn", displayName: "Barn till", value:-1 }
    ]

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        let relationLevel = 100;

        if (customerData.relationPerson) {
            const startingLevel = otherPeopleInTree.find(p => p.id == customerData.relationPerson)?.relationLevel!;
            relationLevel = startingLevel + selectOptions.find(o => o.id === customerData.relationType )!.value;
        }

        const personToAdd = new PersonDM(customerData.firstName as string, customerData.lastName as string, customerData.description as string, 
            customerData.birthdate as string, relationLevel, selectedTreeId)

        addPersonHandler(personToAdd);

        event.target.reset();
    }

    return (
        <div className="w-[35rem]">
            <h2 className="font-medium">Lägg till person</h2>
            <form onSubmit={handleSubmit}>
                <span className="flex">
                    <span >
                        <Input type="text" id="firstName" label="Förnamn" isTextArea={false} />
                    </span>
                    <span className="ml-6">
                        <Input type="text" id="lastName" label="Efternamn" isTextArea={false} />
                    </span>
                </span>
                <Input type="date" id="birthDate" label="Födelsedatum" isTextArea={false} />
                <Input isTextArea={true} id="description" label="Beskrivning" />
                {otherPeopleInTree.length > 0 &&
                    <span className="flex">
                        <span>
                            <Select label="Relation" selectValue="relationType" emptyText="Välj relationstyp" options={selectOptions} />
                        </span>
                        <span className="ml-6">
                            <Select label="Person" selectValue="relationPerson" emptyText="Person" options={otherPeopleInTree} />
                        </span>
                    </span>
                }
                {/* <Button onClick={addNewPerson} buttonText="Spara" /> */}
                <Button buttonText="Spara"></Button>
            </form>
        </div>
    )

}
import { useEffect, useState } from "react";
import Select from "../utilities/Select";
import type PersonDM from "../../../../models/dataModels/PersonDM";
import type SelectOptionsDM from "../../../viewModels/SelectsOptionsDM";

export default function RelationSelect({treeId, relationType, relationPerson}: {treeId:string, relationType?: string, relationPerson?:string }) {

    const [peopleInTree, setPeopleInTree] = useState<SelectOptionsDM[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    async function fetchPeople() {
      try {
        const response = await fetch('http://localhost:3000/persons/personsByTreeId/' + treeId);
        const data = await response.json();

         const peopleForDropdown: any[] = await data.persons.map( (p: PersonDM) => ({
            id: p.id,
            displayName: p.displayName,
            value: p.relationLevel
         }));
        setPeopleInTree(peopleForDropdown);
      } catch (err) {
        console.error("Failed to load people", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPeople();
  }, [treeId]);

    const selectOptions = [
        { id: '1', displayName: "Förälder till", value: 1 },
        { id: '0', displayName: "Syskon till", value: 0 },
        { id: '-1', displayName: "Barn till", value:-1 }
    ]
    
    return (
        <>{loading? <p>Loading...</p>: 
                peopleInTree == undefined ?
                <p>Undefined...</p>:
                peopleInTree!.length > 0 &&
                // <p>Empty array</p>:
                <span className="flex">
                        
                        <span>
                            <Select label="Relation" selectValue="relationType" emptyText="Välj relationstyp" options={selectOptions} prefilledValue={relationType} />
                        </span>
                        <span className="ml-6">
                            <Select label="Person" selectValue="relationPerson" emptyText="Välj person" options={peopleInTree} prefilledValue={relationPerson} />
                        </span>
                    </span>
            }
        </>
    )
}

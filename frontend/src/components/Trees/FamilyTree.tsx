import { Link } from "react-router-dom";
import PersonDM from "../../../../models/dataModels/PersonDM.ts";

const groupByLevel = (inputArray: PersonDM[]): Map<number, PersonDM[]> => {

    return inputArray.reduce((targetArray, person) => {
        if (!targetArray.has(person.relationLevel)) {
            targetArray.set(person.relationLevel, []);
        }
        targetArray.get(person.relationLevel)!.push(person);
        return targetArray;
    }, new Map<number, PersonDM[]>());
};

export default function FamilyTree({ personsInTree }: {personsInTree:PersonDM[]}) {

    const groupedByRelationLevels = groupByLevel(personsInTree);

    const sortedByRelationLevels = new Map(
        Array.from(groupedByRelationLevels.entries()).sort(([ valueA,], [ valueB,]) => valueB - valueA ));

    return (
        <div className="mt-8">
            <ul>
                {[...sortedByRelationLevels.values()].map((sortedPersons: PersonDM[], index: number) => {
                    return (
                        <div key={sortedPersons[0]?.id}>
                            {index != 0 && <p>--------------------------</p>  }
                            <ul>
                                {sortedPersons.map(p => (
                                    <li className="my-1" key={p.id}>
                                        <Link className="font-semibold px-2 py-1.5 rounded-md text-stone-800 hover:bg-stone-400" to={'/persons/' + p.id}>
                                        {p.displayName}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </ul>
        </div>
    )
}


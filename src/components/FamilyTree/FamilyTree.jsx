import { useContext } from "react"

import { TreeContext } from "../../store/tree-context"

export default function FamilyTree({selectedTreeId}) {

    const { persons } = useContext(TreeContext)

    const personsInCurrentTree = persons.filter(p => p.treeId === selectedTreeId) || [];

    return (
        <>
            <h2 className="my-16 text-center text-xl font-bold">FamilyTree</h2>
            <ul>
                {personsInCurrentTree.map(p => {
                    return <li>{p.firstName}</li>
                })}
            </ul>
        </>
    )

}
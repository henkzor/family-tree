import { Await, useNavigate, useRouteLoaderData } from "react-router-dom";
import TreeForm from "../../components/Trees/TreeForm";
import { Suspense } from "react";
import Button from "../../components/utilities/Button";
import type TreeDM from "../../../../models/dataModels/TreeDM";

export default function EditTreePage() {

    const { tree, treeId } = useRouteLoaderData('tree-details');
    const navigate = useNavigate();

    function handleDelete(treeName: string){
        if(window.confirm("Är du säker på att du vill ta bort trädet " + treeName + "?")){
            removeTree(treeId);
            navigate('/trees')
        }
        return;        
    }
    return (
        <>
            <h2 className="font-bold mb-2">Ändra träd</h2>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={tree} >
                    {(loadedTree: TreeDM) => {
                        return <>
                            <TreeForm method="patch" tree={loadedTree} />
                            <div className="mt-2">
                                <Button  buttonText="Ta bort" onClick={() => handleDelete(loadedTree.title)} />
                            </div>
                        </> 
                    }}
                </Await>
            </Suspense>
            
        </>
    )

}

async function removeTree(treeId:string){
    const response = await fetch('http://localhost:3000/trees/' + treeId, {method: 'DELETE'})

    if (!response.ok) 
        throw {
            status: response.status,
            message: "Error occurred when deleting tree",
            statusText: response.statusText,
        };
    
    return;
}
import { Await, useNavigate, useRouteLoaderData } from "react-router-dom";
import PersonForm from "../../components/Persons/PersonForm";
import { Suspense } from "react";
import type PersonDM from "../../../../models/dataModels/PersonDM";
import Button from "../../components/utilities/Button";

export default function EditPersonPage() {

    const { person, personId } = useRouteLoaderData('person-detail');
    const navigate = useNavigate();

    function handleDelete(displayName: string){
        if(window.confirm("Är du säker på att du vill ta bort " + displayName +"?")){
            removePerson(personId);
            navigate('/trees')
        }
        return;        
    }

    return (
        <>
            <h2 className="font-bold">EditPersonPage</h2>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={person} >
                    {(loadedPerson: PersonDM) => {
                        return <>
                            <PersonForm method="patch" person={loadedPerson} treeId={loadedPerson.treeId} />
                            <Button buttonText="Ta bort" onClick={() => handleDelete(loadedPerson.displayName)} />
                        </>
                    }}
                </Await>
            </Suspense>
        </>
    )
}
            
async function removePerson(personId:string){
    const response = await fetch('http://localhost:3000/persons/' + personId, {method: 'DELETE'})

    if (!response.ok) 
    throw {
        status: response.status,
        message: "Error occurred when removing person",
        statusText: response.statusText,
    };
    
    return;
}
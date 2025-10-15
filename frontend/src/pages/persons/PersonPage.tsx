import { Await, Link, useRouteLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import PersonDetails from "../../components/Persons/PersonDetails";
import { Suspense } from "react";
import type PersonDM from "../../../../models/dataModels/PersonDM";
import Button from "../../components/utilities/Button";

export default function PersonPage() {

    const { person } = useRouteLoaderData('person-detail');

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={person} >
                    {(loadedPerson: PersonDM) => {
                        return(
                        <>
                            <PersonDetails person={loadedPerson} />
                            <div className="mt-4 space-x-4"> 

                            <Link  to={"/trees/" + loadedPerson.treeId}>
                                <Button buttonText="Träd" />
                            </Link>
                            <Link to='edit' >
                                <Button buttonText="Ändra" />
                            </Link>
                            </div>
                        </>
                        )}
                    }
                </Await>
            </Suspense>            
        </>
    )
}


export async function loader({ params }: LoaderFunctionArgs) {
    if (params.personId) {
        return {
            person: loadPerson(params.personId),
            personId: params.personId
        }
    }
}

async function loadPerson(personId: string) {
    const response = await fetch('http://localhost:3000/persons/' + personId)

    if (!response.ok) {
        throw {
        status: response.status,
        message: "Error occurred when fetching person",
        statusText: response.statusText,
        };
    } else {
        const resData = await response.json();
        console.log(resData);
        return resData.person;
    }
}
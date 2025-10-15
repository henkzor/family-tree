import { Await, Link, useRouteLoaderData, type LoaderFunctionArgs } from "react-router-dom"
import FamilyTree from "../../components/Trees/FamilyTree.tsx";
import { Suspense } from "react";
import type PersonDM from "../../../../models/dataModels/PersonDM.ts";
import Button from "../../components/utilities/Button.tsx";

export default function TreePage() {

  const { persons, tree } = useRouteLoaderData('tree-details');

  return (
    <div>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={tree} >
          {(loadedTree: any) => {
            console.log(loadedTree)
            return <>
              <div >
                <h2 className="font-bold mb-4" >{loadedTree.title}</h2>
              </div>
              <div className="flex justify-center">
                <div className="text-center w-sm rounded-md bg-stone-100 ring-stone-300 ">
                  <p className="mt-2 mb-4">{loadedTree.description}</p>

                </div>

              </div>
            </>
          }
          }
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>

        <Await resolve={persons} >
          {(loadedPersons: PersonDM[]) => {
            return <FamilyTree personsInTree={loadedPersons} />
          }
          }
        </Await>
      </Suspense>
      <div className="mt-8 space-x-4">

        <Link to='/trees' >
          <Button buttonText="Bakåt" />
        </Link>
        <Link to='edit' >
          <Button buttonText="Ändra" />
        </Link>
        <Link to='newPerson'>
          <Button buttonText="Ny person" />
        </Link>
      </div>

    </div>
  )

}

async function loadPersons(treeId: string) {
  const response = await fetch('http://localhost:3000/persons/personsByTreeId/' + treeId);

  if (!response.ok) {
    throw {
      status: response.status,
      message: "Error occurred when fetching persons",
      statusText: response.statusText,
    };
  } else {
    const resData = await response.json();
    return resData.persons;
  }
}

async function loadTree(treeId: string) {
  const response = await fetch('http://localhost:3000/trees/' + treeId);

  if (!response.ok) {
    throw {
      status: response.status,
      message: "Error occurred when fetching tree",
      statusText: response.statusText,
    };
  } else {
    const resData = await response.json();
    return resData.tree;
  }
}

export function loader({ params }: LoaderFunctionArgs) {
  if (params.treeId) {
    return {
      persons: loadPersons(params.treeId),
      tree: loadTree(params.treeId),
      treeId: params.treeId
    }
  }
}
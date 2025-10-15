import { Await, Link, useLoaderData } from "react-router-dom"
import { Suspense } from "react";

import TreeDM from "../../../../models/dataModels/TreeDM";
import Button from "../../components/utilities/Button";

export default function TreesPage() {

    const {trees } = useLoaderData();

    return (
        <>
            <h2 className="font-bold mb-6">Träd</h2>

            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
              <ul>
                  <Await resolve={trees} >
                  {loadedTress => 
                  loadedTress.map((tree: TreeDM)  => 
                      <li className="my-2 " key={tree.id}>
                          <Link className="font-semibold p-2 rounded-md text-stone-800 hover:bg-stone-400"  to={'/trees/' + tree.id } >
                              {tree.title}
                          </Link>
                      </li>)}
                  </Await>
              </ul>
            </Suspense>
            <div className="mt-6">

              <Link to="new"  >
                <Button buttonText="Nytt träd" />
              </Link>
            </div>
        </>
    )
}

async function loadTrees() {
      const response = await fetch('http://localhost:3000/trees');
      if (!response.ok) {
        throw {
          status: response.status,
          message: "Error occurred when fetching trees",
          statusText: response.statusText,
        };
      } else {
        const resData = await response.json();
        return resData.trees;
      }
}

export  function loader() {
  return {
    trees: loadTrees()
  }
}
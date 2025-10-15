import { Form, Link, redirect, useNavigate, useNavigation, type HTMLFormMethod } from "react-router-dom";
import Button from "../utilities/Button";

export default function TreeForm({ method, tree }: { tree?: any, method: string }) {

  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate(-1);
  }
  return (
    <Form method={method as HTMLFormMethod} >
      <div className="flex flex-col items-center mb-6">

        <div className="w-full max-w-xs space-y-3 mb-4">
          <label className="block font-semibold" htmlFor="title">Namn</label>
          <input className="py-2.5 px-4 block w-full bg-gray-50 border-gray-200 rounded-lg ring-1 ring-stone-300 focus:ring-2  focus:border-blue-500 focus:ring-blue-500 " id="title" type="text" name="title" required defaultValue={tree ? tree.title : ''} />
        </div>

        <div className="w-full block max-w-sm space-y-3">
          <label className="block font-semibold" htmlFor="description">Beskrivning</label>
          <textarea className="block p-2.5 w-full  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="description" name="description" rows={5} required defaultValue={tree ? tree.description : ''} />
        </div>

      </div>

      <div className="mt-4 space-x-4">
        <Button buttonText="Avbryt" disabled={isSubmitting} type="button" onClick={cancelHandler} />
        <Button buttonText={isSubmitting ? 'Skickar...' : 'Spara'} disabled={isSubmitting} />
      </div>
    </Form>
  )
}


export async function upsertTreeFunction({ request, params }: { request: Request, params: any }) {
  const method = request.method;
  const formdata = await request.formData();

  const treeToAdd = {
    title: formdata.get('title'),
    description: formdata.get('description'),
  };

  let url = 'http://localhost:3000/trees';

  if (method === "PATCH") {
    url += '/' + params.treeId;
  }

  const response = await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(treeToAdd)
  });
  if (!response.ok) {
    throw {
      status: response.status,
      message: "Error occurred when " + method === "PATCH" ? "updating" : "creating" + " tree",
      statusText: response.statusText,
    };
  }

  const resData = await response.json();
  return redirect('/trees/' + resData.id);// ID som vi får tillbaka på POST
}
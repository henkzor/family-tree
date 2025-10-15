import { Form, redirect, useNavigate, useNavigation, type HTMLFormMethod } from "react-router-dom";
import type PersonDM from "../../../../models/dataModels/PersonDM";
import RelationSelect from "./RelationSelect";
import Button from "../utilities/Button";

export default function PersonForm({method, person, treeId }: {person?: PersonDM, treeId?: string, method:string}) {

    const navigate = useNavigate();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';
    
    function cancelHandler() {
        navigate(-1);
    }

    return (
        <>
            
            <Form className="flex flex-col items-center mb-6 space-y-2" method={method as HTMLFormMethod} >
                <div className="space-y-2 mt-4">
                    <label className="block font-semibold"  htmlFor="firstName">Förnamn</label>
                    <input className="py-2 px-4 block w-full bg-gray-50 border-gray-200 rounded-lg ring-1 ring-stone-300  focus:outline-0 focus:ring-blue-500 " id="firstName" type="text" name="firstName" required defaultValue={person? person.firstName : ''} />
                </div>
                <div className=" space-y-2">
                    <label className="block font-semibold" htmlFor="lastName">Efternamn</label>
                    <input className="py-2 px-4 block w-full bg-gray-50 border-gray-200 rounded-lg ring-1 ring-stone-300  focus:outline-0 focus:ring-blue-500 " id="lastName" type="text" name="lastName" required defaultValue={person? person.lastName : ''} />
                </div>
                <div className=" space-y-2 w-xs" >
                    <label className="block font-semibold" htmlFor="description">Beskrivning</label>
                    <textarea className="py-2 px-4 block w-full bg-gray-50 border-gray-200 rounded-lg ring-1 ring-stone-300 focus:outline-0 focus:ring-blue-500 " id="description" name="description" rows={5} required defaultValue={person? person.description : ''} />
                </div>
                <div className=" space-y-2" >
                    <label className="block font-semibold" htmlFor="birthDate">Födelsedatum</label>
                    <input className="py-2 px-4 block w-full bg-gray-50 border-gray-200 rounded-lg ring-1 ring-stone-300 focus:outline-0 focus:ring-blue-500 " id="birthDate" type="date" name="birthDate" required defaultValue={person? person.birthDate : ''} />
                </div>
                <div>
                    {treeId && <RelationSelect treeId={treeId} relationPerson={person? person.relationPerson : ''} relationType={person? person.relationType : ''} /> }
                </div>

                <input name='treeId' readOnly hidden value={treeId? treeId : ''} />
                
                <div className="mt-4 space-x-4">
                    <Button buttonText="Avbryt" disabled={isSubmitting} type="button" onClick={cancelHandler} />

                    <Button buttonText={isSubmitting? 'Skickar...': 'Spara'} disabled={isSubmitting} />
                </div>
            </Form>
        </>
    )

}


export async function upsertPersonFunction({request, params}: {request: Request, params: any}){
   const method = request.method;
   const formdata = await request.formData();

   const personToAdd = {
      firstName: formdata.get('firstName'),
      lastName: formdata.get('lastName'),
      birthDate: formdata.get('birthDate'),
      description: formdata.get('description'),
      treeId: formdata.get('treeId'),
    };
      
    const relationInfo = {
        person: formdata.get('relationPerson'),
        type: formdata.get('relationType')
    }

    const fullObject = {
        person: personToAdd,
        relation: relationInfo
    }

   let url = 'http://localhost:3000/persons';

   if(method === "PATCH"){
     url += '/' + params.personId;
   }
    
   const response = await fetch(url, {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(fullObject)
   });
   if(!response.ok){
      throw {
      status: response.status,
      message: "Error occurred when " + method === "PATCH"? "updating":"creating" + " person",
      statusText: response.statusText,
    };
   }

   const resData = await response.json();
   return redirect('/persons/' + resData.id);
}
import { NotFoundError }  from '../util/errors.js';

import PersonDM  from '../../models/dataModels/PersonDM.ts';

import { readData, writeData }  from '../util/functions.js';

async function getAllPersons() {
  const allPersons = await readData('persons');
  if (!allPersons) {
    throw new NotFoundError('Could not find any persons.');
  }
  return allPersons;
}

async function getPersonsByTreeId(treeId: string) {
  const allPersons = await readData('persons');
  const filteredPersons = allPersons.filter((person: PersonDM)  => person.treeId === treeId )

  return filteredPersons;
}

async function getPersonById(personId: string) {
  const allPersons = await readData('persons');
  const filteredPerson = allPersons.filter((person: PersonDM)   => person.id === personId )[0];
//Felhantering om vi inte hittar någon
  return filteredPerson;
}

async function createNewPerson(inputObject: any) {
  console.log("createNew input: ")
  console.log(inputObject)

  const storedData = await readData('persons');

  const id = parseFloat(Math.random().toFixed(5)).toString().substring(2)
  //TODO: Felhantering för att inte få dubletter
  const displayName = inputObject.person.firstName + " " + inputObject.person.lastName

  let relationLevel = 100;
  let relationPerson: string | null = null;
  let relationType = null;
  if(inputObject.relation.person && inputObject.relation.type){
    relationPerson = inputObject.relation.person;
    const personForRelation = storedData.filter( (person: PersonDM) => person.id == relationPerson);
  
    relationType = Number(inputObject.relation.type);
    relationLevel = personForRelation[0].relationLevel + relationType;
  }


  storedData.unshift({ ...inputObject.person, id, displayName, relationLevel, relationType, relationPerson });
  await writeData(storedData, 'persons');
  return JSON.parse(id);
}

async function updatePerson(inputObject: any, personId: string) {

  const storedData = await readData('persons');
  const personToUpdate = storedData.filter( (person: PersonDM) => person.id === personId)[0];
  const personToUpdateIndex = storedData.findIndex((person: PersonDM) => person.id === personId)

  personToUpdate.description = inputObject.person.description;
  personToUpdate.birthDate = inputObject.person.birthDate;

  if (personToUpdate.firstName != inputObject.person.firstName || personToUpdate.lastName != inputObject.person.lastName)
  {
    personToUpdate.firstName = inputObject.person.firstName;
    personToUpdate.lastName = inputObject.person.lastName;
    personToUpdate.displayName = inputObject.person.firstName + " " + inputObject.person.lastName;
  }

  if(personToUpdate.relationPerson != inputObject.relation.person || personToUpdate.relationType != inputObject.relation.type){
    const relationPerson = inputObject.relation.person
    const relationType = Number(inputObject.relation.type)

    personToUpdate.relationPerson = relationPerson;
    personToUpdate.relationType = relationType;
    personToUpdate.relationLevel = storedData.filter( (person: PersonDM) => person.id == relationPerson)[0].relationLevel + relationType;
  }

  storedData[personToUpdateIndex] = personToUpdate;
  await writeData(storedData, 'persons');
  return JSON.parse(personId);
}

async function deletePerson(personId: string) {
  const allPersons = await readData('persons');
  const personToUpdateIndex = allPersons.findIndex((person: PersonDM) => person.id === personId)

  allPersons.splice(personToUpdateIndex,1);
  
  await writeData(allPersons, 'persons');
  return;
}

export {getAllPersons, getPersonsByTreeId, getPersonById, createNewPerson, updatePerson, deletePerson};

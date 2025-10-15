import { NotFoundError } from '../util/errors.js';
import TreeDM  from '../../models/dataModels/TreeDM.ts';

import { readData, writeData } from '../util/functions.js';

async function getAllTrees() {
  const storedData = await readData('trees');
  if (!storedData) {
    throw new NotFoundError('Could not find any trees.');
  }
  return storedData;
}

async function getTreeById(treeId: string) {
  const allTrees = await readData('trees');
  const filteredTrees = allTrees.filter((tree: any)  => tree.id === treeId )[0];

  // console.log(filteredTrees)

  // if(!filteredTrees?.length){
  //   console.log("hej")

  //   throw NotFoundError
  // }

  return filteredTrees;
}

async function createNewTree(inputTree: TreeDM) {

  const storedData = await readData('trees');
  const id = parseFloat(Math.random().toFixed(5)).toString().substring(2)
  //TODO: Felhantering för att inte få dubletter
  storedData.unshift({ ...inputTree, id });
  await writeData(storedData, 'trees');
  return JSON.parse(id)
}

async function updateTree(inputTree : TreeDM, treeId: string) {
  console.log("updateTree input")
  console.log(inputTree)

  const storedData = await readData('trees');

  const treeToUpdate = storedData.filter( (tree: TreeDM) => tree.id === treeId)[0];
  const treeToUpdateIndex = storedData.findIndex((tree: TreeDM) => tree.id === treeId)

  treeToUpdate.title = inputTree.title;
  treeToUpdate.description = inputTree.description;


  storedData[treeToUpdateIndex] = treeToUpdate;
  await writeData(storedData, 'trees');
  return JSON.parse(treeId);
}

async function deleteTree(treeId: string) {
  const allTrees = await readData('trees');
  const treeToUpdateIndex = allTrees.findIndex((tree: TreeDM) => tree.id === treeId)

  allTrees.splice(treeToUpdateIndex,1);
  
  await writeData(allTrees, 'trees');
  return;
}

export {getAllTrees, getTreeById, createNewTree, updateTree, deleteTree};
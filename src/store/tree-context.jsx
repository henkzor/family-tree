import { createContext, useState } from "react";

export const TreeContext = createContext({
    selectedTreeId: undefined,
    trees: [],
    persons: [],
    selectTreeHandler: () => {},
    startAddTreeHandler: () => {},
    cancelAddNewTreeHandler: () => {},
    addTreeHandler: () => {},
    deleteTreeHandler: () => {},
    addPersonHandler: () => {}
});

const storedTrees = JSON.parse(localStorage.getItem("trees")) || [];
const storedPersons = JSON.parse(localStorage.getItem("persons")) || [];

export default function TreeContextProvider({children}){
    const [treesState, setTreesState] = useState({
        selectedTreeId: undefined,
        trees: [...storedTrees],
        persons: [...storedPersons]
      })

    
      function handleStartAddTree() {
        setTreesState((prevState) => {
          return {
            ...prevState,
            selectedTreeId: null
          };
        })
      }
    
      function handleAddTree(newTreeData) {
        const newTree = {
          ...newTreeData,
          id: Math.random()
        }

        setTreesState((prevState) => {
          return {
            ...prevState,
            selectedTreeId: newTree.id,
            trees: [...prevState.trees, newTree]
          }
        })

        const currentlystoredTrees = JSON.parse(localStorage.getItem("trees")) || [];
        localStorage.setItem("trees", JSON.stringify([...currentlystoredTrees, newTree]));
      }
    
      function handleAddPerson(newPersonData) {
        const newPerson = {
          ...newPersonData,
          id: Math.random()
        }

        setTreesState((prevState) => {
          return {
            ...prevState,
            persons: [...prevState.persons, newPerson]
          }
        })

        const currentlystoredPersons = JSON.parse(localStorage.getItem("persons")) || [];
        localStorage.setItem("persons", JSON.stringify([...currentlystoredPersons, newPerson]));
      }
    
      function handleCancelAddTree() {
        setTreesState((prevState) => {
    
          return {
            ...prevState,
            selectedTreeId: undefined
          }
        })
      }
    
      function handleSelectTree(id) {
        setTreesState((prevState) => {
          return {
            ...prevState,
            selectedTreeId: id
          };
        })
      }
    
      function handleDeleteTree(id) {
        setTreesState((prevState) => {
          return {
            ...prevState,
            selectedTreeId: undefined,
            trees: treesState.trees.filter(p => p.id !== id)
          };
        })

        const currentlystoredTrees = JSON.parse(localStorage.getItem("trees")) || [];
        localStorage.setItem("trees", JSON.stringify([...currentlystoredTrees.filter(p => p.id !== id)]));

      }

      const ctxValue = {
        selectedTreeId: treesState.selectedTreeId,
        trees: treesState.trees,
        persons: treesState.persons,
        startAddTreeHandler: handleStartAddTree,
        addTreeHandler: handleAddTree,
        cancelAddNewTreeHandler: handleCancelAddTree,
        selectTreeHandler: handleSelectTree,
        deleteTreeHandler: handleDeleteTree,
        addPersonHandler: handleAddPerson
    }

    return <TreeContext.Provider value={ctxValue}> 
        {children}
    </TreeContext.Provider>

}
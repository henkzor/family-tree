import { useContext } from 'react'

import Sidebar from "./components/Sidebar/Sidebar.jsx";
import NewTree from "./components/MainSection/NewTree.jsx";
import NoTreeSelected from "./components/MainSection/NoTreeSelected.jsx";
import SelectedTree from "./components/MainSection/SelectedTree.jsx";
import { TreeContext } from './store/tree-context.jsx';

function App() {
  const {selectedTreeId} = useContext(TreeContext)

  let treesContent = "";

  if (selectedTreeId === null) {
    treesContent = <NewTree />
  }
  else if (selectedTreeId === undefined) {
    treesContent = <NoTreeSelected />
  }
  else {
    treesContent = <SelectedTree />
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <Sidebar />
        {treesContent}
      </main>
    </>
  );
}

export default App;

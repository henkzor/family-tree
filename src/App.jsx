import { useContext } from 'react'

import Sidebar from "./components/Sidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";
import { ProjectContext } from './store/project-context.jsx';

function App() {
  const {selectedProjectId} = useContext(ProjectContext)

  let projectsContent = "";

  if (selectedProjectId === null) {
    projectsContent = <NewProject />
  }
  else if (selectedProjectId === undefined) {
    projectsContent = <NoProjectSelected />
  }
  else {
    projectsContent = <SelectedProject  />
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <Sidebar />
        {projectsContent}
      </main>
    </>
  );
}

export default App;

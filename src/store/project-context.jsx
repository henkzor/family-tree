import { createContext, useState } from "react";

export const ProjectContext = createContext({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
    selectProjectHandler: () => {},
    cancelAddNewProjectHandler: () => {},
    startAddProjectHandler: () => {},
    addTaskHandler: () => {},
    deleteProjectHandler: () => {},
    deleteTaskHandler: () => {},
    addNewProjectHandler: () => {}
});

export default function ProjectContextProvider({children}){
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: []
      })
    
      function handleAddTask(inputTask) {
        setProjectsState((prevState) => {
          const newTask = {
            text: inputTask,
            projectId: prevState.selectedProjectId,
            id: Math.random()
          }
    
          return {
            ...prevState,
            tasks: [...prevState.tasks, newTask]
          };
        })
      }
    
      function handleDeleteTask(id) {
        setProjectsState((prevState) => {
          return {
            ...prevState,
            tasks: projectsState.tasks.filter(t => t.id !== id)
          };
        })
      }
    
      function handleStartAddProject() {
        setProjectsState((prevState) => {
          return {
            ...prevState,
            selectedProjectId: null
          };
        })
      }
    
      function handleAddProject(newProjectData) {
        setProjectsState((prevState) => {
    
          const newProject = {
            ...newProjectData,
            id: Math.random()
          }
    
          return {
            ...prevState,
            selectedProjectId: undefined,
            projects: [...prevState.projects, newProject]
          }
        })
      }
    
      function handleCancelAddProject() {
        setProjectsState((prevState) => {
    
          return {
            ...prevState,
            selectedProjectId: undefined
          }
        })
      }
    
      function handleSelectProject(id) {
        setProjectsState((prevState) => {
          return {
            ...prevState,
            selectedProjectId: id
          };
        })
      }
    
      function handleDeleteProject(id) {
        setProjectsState((prevState) => {
          return {
            ...prevState,
            selectedProjectId: undefined,
            projects: projectsState.projects.filter(p => p.id !== id),
            tasks: projectsState.tasks.filter(t => t.projectId !== id)
          };
        })
      }

      const ctxValue = {
        selectedProjectId: projectsState.selectedProjectId,
        projects: projectsState.projects,
        tasks: projectsState.tasks,
        addTaskHandler: handleAddTask,
        deleteTaskHandler: handleDeleteTask,
        startAddProjectHandler: handleStartAddProject,
        addNewProjectHandler: handleAddProject,
        cancelAddNewProjectHandler: handleCancelAddProject,
        selectProjectHandler: handleSelectProject,
        deleteProjectHandler: handleDeleteProject
    }

    return <ProjectContext.Provider value={ctxValue}> 
        {children}
    </ProjectContext.Provider>

}
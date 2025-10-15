import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeRootLayout from './pages/roots/HomeRoot'
import HomePage from './pages/HomePage'
import TreesPage, {loader as TreesLoader} from './pages/trees/TreesPage'
import TreePage, {loader as TreeLoader} from './pages/trees/TreePage'
import NewTreePage from './pages/trees/NewTreePage'
import { upsertTreeFunction } from './components/Trees/TreeForm'
import NewPersonPage from './pages/persons/NewPersonPage'
import PersonPage, {loader as PersonLoader} from './pages/persons/PersonPage'
import EditPersonPage from './pages/persons/EditPersonPage'
import { upsertPersonFunction } from './components/Persons/PersonForm'
import EditTreePage from './pages/trees/EditTreePage'
import ErrorPage from './pages/ErrorPage'

function App() {

  const router = createBrowserRouter(
    [  {
    path: '/',
    element: <HomeRootLayout />,
    errorElement: <ErrorPage />,
    children: [
    {
      index: true,
      element: <HomePage />
    },
    {
      path: '/trees',
      element: <TreesPage />,
      loader: TreesLoader
    },
    {
      path: 'trees/:treeId',
      id: 'tree-details',
      loader: TreeLoader,
      children:[
        {
          index:true,
          element: <TreePage />
        },
        {
          path: 'edit',
          element: <EditTreePage />,
          action: upsertTreeFunction
        }
      ]
    },
    {
      path: 'trees/:treeId/newPerson',
      element: <NewPersonPage />,
      action: upsertPersonFunction
    },
    {
      path: 'trees/new',
      element: <NewTreePage />,
      action: upsertTreeFunction
    },
    {
      path: 'persons/new',
      element: <NewPersonPage />,
      action: upsertPersonFunction
    },
    {
      path: 'persons/:personId',
      id: 'person-detail',
      loader: PersonLoader,
      children: [
        {
          index: true,
          element: <PersonPage />
        },
        {
          path: 'edit',
          element: <EditPersonPage />,
          action: upsertPersonFunction
        }          
      ]
    }
    ]
  }
  ]);

  return <RouterProvider router={router} />

}

export default App

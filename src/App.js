import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import AuthPage, { action as authAction } from './pages/Auth';
import PlantsPage, { loader as plantsLoader } from './pages/Plants';
import ErrorPage from './pages/Error';
import PlantDetailPage, { loader as plantDetailLoader, action as deletePlantAction } from './pages/PlantDetail';
import EditPlantPage from './pages/EditPlant';
import PlantRoot from './pages/PlantRoot';
import NewPlantPage from './pages/NewPlant';
import { action as manipulatePlantAction } from './components/PlantForm';
import { action as logoutAction } from './pages/Logout';
import { tokenLoader, checkAuthLoader } from './util/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'plants',
        element: <PlantRoot />,
        children: [
          {
            index: true,
            element: <PlantsPage />,
            loader: plantsLoader,
          },
          {
            path: ':plantId',
            id: 'detail',
            loader: plantDetailLoader,
            children: [
              {
                index: true,
                element: <PlantDetailPage />,
                action: deletePlantAction,
              },
              {
                path: 'edit',
                element: <EditPlantPage />,
                action: manipulatePlantAction,
                loader: checkAuthLoader
              },
            ]
          },
          {
            path: 'new',
            element: <NewPlantPage />,
            action: manipulatePlantAction,
            loader: checkAuthLoader
          }
        ]
      },
      {
        path: 'auth',
        element: <AuthPage />,
        action: authAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

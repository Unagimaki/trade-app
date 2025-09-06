import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BaseLayout } from '@/app/layouts/base-layout';
import App from '@/App';
import { DepositCurvePage } from '@/pages/DepositCurvePage/ui/DepositCurvePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'curve',
        element: <DepositCurvePage />,
      },
      {
        path: '*',
        element: <div>404 - Страница не найдена</div>,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
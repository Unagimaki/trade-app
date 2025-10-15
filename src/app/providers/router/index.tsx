import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BaseLayout } from '@/app/layouts/base-layout';
import { DepositCurvePage } from '@/pages/DepositCurvePage/ui/DepositCurvePage';
import LandingMainPage from '@/pages/LandingPage/ui/LandingMainPage';
import { TradesListPage } from '@/pages/TradesListPage/ui/TradesListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <LandingMainPage />,
      },
      {
        path: 'curve',
        element: <DepositCurvePage />,
      },
      {
        path: 'trades',
        element: <TradesListPage />,
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
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BaseLayout } from '@/app/layouts/base-layout';
import { DepositCurvePage } from '@/pages/DepositCurvePage/ui/DepositCurvePage';
import { TradesListPage } from '@/pages/TradesListPage/ui/TradesListPage';
import { LandingPage } from '@/pages/LandingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
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
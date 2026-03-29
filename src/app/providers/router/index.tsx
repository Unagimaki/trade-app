import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BaseLayout } from '@/app/layouts/base-layout';
import { DepositCurvePage } from '@/pages/DepositCurvePage/ui/DepositCurvePage';
import LandingMainPage from '@/pages/LandingPage/ui/LandingMainPage';
import { TradeTablePage } from '@/pages/TradeTablePage/ui/TradeTablePage';
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
        path: 'trades/:tableId',
        element: <TradeTablePage />,
      },
      {
        path: '*',
        element: <div>404 - РЎС‚СЂР°РЅРёС†Р° РЅРµ РЅР°Р№РґРµРЅР°</div>,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BaseLayout } from '@/app/layouts/base-layout';
import App from '@/App';
import { DepositCurvePage } from '@/pages/DepositCurvePage/ui/DepositCurvePage';

// Импорты ваших страниц (создайте их по необходимости)
// import { AboutPage } from '@/pages/about';
// import { ContactPage } from '@/pages/contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <App />, // Ваш главный компонент
      },
      {
        path: 'curve',
        element: <DepositCurvePage />,
      },
      // {
      //   path: 'contact',
      //   element: <ContactPage />,
      // },
      {
        path: '*',
        element: <div>404 - Страница не найдена</div>, // Замените на ваш компонент 404
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
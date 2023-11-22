import React from 'react'
import {About,Cart,Checkout,Error,HomeLayout,Login,Register,Products,SingleProduct,Orders,Landing} from './pages'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import { ErrorElement } from './components';
import { loader as landingLoader } from './pages/Landing';
import {loader as SingleProductLoader } from './pages/SingleProduct';
import { loader as productsLoader } from './pages/Products';
import { loader as checkoutLoader } from './pages/Checkout';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import CheckoutForm, { action as checkoutAction } from './components/CheckoutForm';
import { store } from './store';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
        errorElement:ErrorElement
      },
      {
        path: 'products',
        element: <Products />,
        loader: productsLoader
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        errorElement:ErrorElement,
        loader: SingleProductLoader
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      { path: 'about', element: <About /> },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store),
        action:checkoutAction(store)

      },
      {
        path: 'orders',
        element: <Orders />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
     action: loginAction(store)
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
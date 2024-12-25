import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";

import HomePage from "./pages/HomePage";
import AuthCallback from "./pages/AuthCallback";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import OrderStatusPage from "./pages/OrderStausPage";
import DetailPage from "./pages/DetailPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />

      <Route path='/auth-callback' element={<AuthCallback />} />
      <Route
        path='/search/:city'
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path='/details/:restaurantId'
        element={
          <Layout>
            <DetailPage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path='/user-profile'
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />

        <Route
          path='/manage-restaurant'
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
        <Route path="/order-status" element={
          <Layout>
            <OrderStatusPage />
          </Layout>
        } />
      </Route>

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};
export default AppRoutes;

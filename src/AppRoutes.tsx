import { Navigate, Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";

const AppRoutes = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                {/* Rutas publicas */}
                <Route path="/" element={<Layout showHero={true}><HomePage /></Layout>} />
                <Route path="/auth-callback" element={<AuthCallbackPage />} />
                {/* Proteccion de rutas */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>} />
                    <Route path='/manage-restaurant' element={
                        <Layout>
                            <ManageRestaurantPage />
                        </Layout>
                    } />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </QueryClientProvider>
    )
}
export default AppRoutes;
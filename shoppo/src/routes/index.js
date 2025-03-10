
import AdminOrder from "../pages/AdminPage/AdminOrder";
import AdminPage from "../pages/AdminPage/AdminPage";
import AdminProduct from "../pages/AdminPage/AdminProduct";
import Cart from "../pages/CartPage/CartPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path: '/login',
        page: LoginPage,
        isShowHeader: true
    },
    {
        path: '/register',
        page: RegisterPage,
        isShowHeader: true
    },
    {
        path: '/profile',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/admin',
        page: AdminPage,
        isShowHeader: true,
    },
    {
        path: '/cart',
        page: Cart,
        isShowHeader: true,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path: '/admin/products',
        page: AdminProduct,
        isShowHeader: true,
    },
    {
        path: '/admin/orders',
        page: AdminOrder,
        isShowHeader: true,
    },
    {
        path: '/myorder',
        page: MyOrderPage,
        isShowHeader: true,
    },
    {
        path:'*',
        page: NotFoundPage     
    }
]
import { MainPage, SignUpPage, LoginPage, Manage, DashBroad } from "../pages";
import { DefaultLayout } from "../layout";
const publicRoutes = [
  { path: "/signup", component: SignUpPage },
  { path: "/login", component: LoginPage },
];

const privateRoutes = [
  { path: "/", component: MainPage, layout: DefaultLayout },
  { path: "/dManage", component: Manage, layout: DefaultLayout },
  { path: "/dashboard", component: DashBroad, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };

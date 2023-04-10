import { MainPage, SignUpPage, LoginPage } from "../pages";
import { DefaultLayout } from "../layout";
const publicRoutes = [
  { path: "/signup", component: SignUpPage },
  { path: "/login", component: LoginPage },
];

const privateRoutes = [
  { path: "/", component: MainPage, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };

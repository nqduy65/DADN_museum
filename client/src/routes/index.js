import {
  MainPage,
  SignUpPage,
  LoginPage,
  Manage,
  DashBroad,
  exhibitManage,
  RecordSave,
} from "../pages";
import { DefaultLayout } from "../layout";
const publicRoutes = [
  { path: "/signup", component: SignUpPage },
  { path: "/login", component: LoginPage },
];

const privateRoutes = [
  { path: "/", component: MainPage, layout: DefaultLayout },
  { path: "/dManage", component: Manage, layout: DefaultLayout },
  { path: "/oManage", component: exhibitManage, layout: DefaultLayout },
  { path: "/dashboard", component: DashBroad, layout: DefaultLayout },
  { path: "/save", component: RecordSave, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };

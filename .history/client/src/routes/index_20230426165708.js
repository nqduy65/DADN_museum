import {
  MainPage,
  SignUpPage,
  LoginPage,
  Manage,
  DashBroad,
  RecordSave,
  ExhibitManage,
} from "../pages";
import { DefaultLayout } from "../layout";
const publicRoutes = [
  { path: "/signup", component: SignUpPage },
  { path: "/login", component: LoginPage },
];

const privateRoutes = [
  { path: "/", component: MainPage, layout: DefaultLayout },
  { path: "/dManage", component: Manage, layout: DefaultLayout },
  { path: "/oManage", component: ExhibitManage, layout: DefaultLayout },
  { path: "/dashboard", component: DashBroad, layout: DefaultLayout },
  { path: "/save", component: RecordSave, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };

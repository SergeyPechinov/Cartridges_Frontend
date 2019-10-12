import Cartridges from "../App/Containers/Cartridges";
import Profile from "../App/Containers/Profile";

export const router = [
  {
    path: '/',
    exact: true,
    component: Cartridges,
  },
  {
    path: '/profile',
    component: Profile,
  },
];
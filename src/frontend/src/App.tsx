import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import GymFacilitiesPage from './pages/GymFacilitiesPage';
import MassageTherapyPage from './pages/MassageTherapyPage';
import RestaurantCoffeePage from './pages/RestaurantCoffeePage';
import ExtraPremiumFacilitiesPage from './pages/ExtraPremiumFacilitiesPage';
import MembershipPlansPage from './pages/MembershipPlansPage';
import OnlineAdmissionPage from './pages/OnlineAdmissionPage';
import InquiryPage from './pages/InquiryPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

const rootRoute = createRootRoute({
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const gymRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gym-facilities',
  component: GymFacilitiesPage,
});

const massageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/massage-therapy',
  component: MassageTherapyPage,
});

const restaurantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/restaurant-coffee',
  component: RestaurantCoffeePage,
});

const facilitiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/extra-facilities',
  component: ExtraPremiumFacilitiesPage,
});

const membershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/membership',
  component: MembershipPlansPage,
});

const admissionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admission',
  component: OnlineAdmissionPage,
});

const inquiryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/inquiry',
  component: InquiryPage,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gallery',
  component: GalleryPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  gymRoute,
  massageRoute,
  restaurantRoute,
  facilitiesRoute,
  membershipRoute,
  admissionRoute,
  inquiryRoute,
  galleryRoute,
  contactRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

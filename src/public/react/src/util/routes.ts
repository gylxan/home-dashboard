interface Routes {
  [routeName: string]: string;
}

// To be used with <Route path="..."> in components
const routes: Routes = {
  home: '/',
  skipbo: '/skipbo',
};

interface LinkTo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [routeOrEntityName: string]: (...args: any[]) => string;
}

// To be used with <Link to="..."> in components
export const linkTo: LinkTo = {
  home: (): string => '/',
  skipbo: (): string => routes.skipbo,
};

export default routes;

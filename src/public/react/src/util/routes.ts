interface Routes {
  [routeName: string]: string;
}

// To be used with <Route path="..."> in components
const routes: Routes = {
  home: '/',
  skipbo: '/skipbo',
  skipboAddGame: '/skipbo/create',
  skipboTable: '/skipbo/table',
  entscheidomat: '/entscheidomat',
};

interface LinkTo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [routeOrEntityName: string]: (...args: any[]) => string;
}

// To be used with <Link to="..."> in components
export const linkTo: LinkTo = {
  home: (): string => '/',
  skipbo: (): string => routes.skipbo,
  skipboAddGame: (): string => routes.skipboAddGame,
  skipboTable: (): string => routes.skipboTable,
  entscheidomat: (): string => routes.entscheidomat,
};

export const MAIN_TITLE = 'Home Dashboard';

export const getPageTitle = (title?: string): string => MAIN_TITLE + (!!title ? ` - ${title}` : '');

export default routes;

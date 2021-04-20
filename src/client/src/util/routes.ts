type Routes = Record<string, string>;

// To be used with <Route path="..."> in components
const routes: Routes = {
  home: '/',
  skipbo: '/skipbo',
  skipboAddGame: '/skipbo/create',
  skipboTable: '/skipbo/table',
  entscheidomat: '/entscheidomat',
  light: '/light',
  login: '/login',
  user: '/user',
};

type LinkTo = Record<string, (...args: any[]) => string>;

// To be used with <Link to="..."> in components
export const linkTo: LinkTo = {
  home: (): string => '/',
  skipbo: (): string => routes.skipbo,
  skipboAddGame: (): string => routes.skipboAddGame,
  skipboTable: (): string => routes.skipboTable,
  entscheidomat: (): string => routes.entscheidomat,
  light: (): string => routes.light,
  login: (): string => routes.login,
  user: (): string => routes.user,
};

export const MAIN_TITLE = 'Home Dashboard';

export const getPageTitle = (title?: string): string => MAIN_TITLE + (!!title ? ` - ${title}` : '');

export default routes;

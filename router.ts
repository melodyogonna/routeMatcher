function routehandler(requestRoute: string, matchedRoute: string): string {
  return `requested path ${requestRoute} matched the route ${matchedRoute}`;
}

interface RouteInterface {
  route: string;
  callback: (requestRoute: string, matchedRoute: string) => string;
}

const routes: RouteInterface[] = [
  {
    route: "/users/:id",
    callback: routehandler,
  },
  {
    route: "/home",
    callback: routehandler,
  },
  {
    route: "/user/:id/profile",
    callback: routehandler,
  },
];

class RouteMatcher {
  routes: RouteInterface[];

  constructor(routes: RouteInterface[]) {
    this.routes = routes;
  }

  matchRoute(route: string) {
    const singleRouteRegex: RegExp = /^\/\w+(\/)?$/;
    const routeWithParamRegex: RegExp = /^\/\w+(\/\w+)+?(\/)?$/;
    const routeWithParamAndOtherRoutesRegex: RegExp = /^\/\w+(\/\w+){2,}(\/)?$/;

    if (singleRouteRegex.test(route)) {
      return this.handleSingleRoute(route);
    }

    if (routeWithParamRegex.test(route)) {
      return this.handleRouteWithParam(route);
    }
  }

  handleSingleRoute(route: string) {
    for (let i = 0; i < this.routes.length; i += 1) {
      let routePath = this.routes[i].route;
      let routeCallback = this.routes[i].callback;

      if (this.stripRoute(route) === this.stripRoute(routePath)) {
        return routeCallback(route, routePath);
      }
    }
  }

  handleRouteWithParam(route: string) {}

  private stripRoute(route: string) {
    let nakedString: string;

    if (route.endsWith("/")) {
      nakedString = route.substring(0, route.length - 1);
    } else {
      nakedString = route.substring(0);
    }

    return nakedString;
  }
}

const routeMatcher = new RouteMatcher(routes);

console.log(routeMatcher.matchRoute("/home"));

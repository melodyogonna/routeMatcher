function routehandler(requestRoute, matchedRoute) {
    return `requested path ${requestRoute} matched the route ${matchedRoute}`;
}
const routes = [
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
    constructor(routes) {
        this.routes = routes;
    }
    matchRoute(route) {
        const singleRouteRegex = /^\/\w+(\/)?$/;
        const routeWithParamRegex = /^\/\w+(\/\w+)+?(\/)?$/;
        const routeWithParamAndOtherRoutesRegex = /^\/\w+(\/\w+){2,}(\/)?$/;
        if (singleRouteRegex.test(route)) {
            return this.handleSingleRoute(route);
        }
        if (routeWithParamRegex.test(route)) {
            return this.handleRouteWithParam(route);
        }
    }
    handleSingleRoute(route) {
        for (let i = 0; i < this.routes.length; i += 1) {
            let routePath = this.routes[i].route;
            let routeCallback = this.routes[i].callback;
            if (this.stripRoute(route) === this.stripRoute(routePath)) {
                return routeCallback(route, routePath);
            }
        }
    }
    handleRouteWithParam(route) { }
    stripRoute(route) {
        let nakedString;
        if (route.endsWith("/")) {
            nakedString = route.substring(0, route.length - 1);
        }
        else {
            nakedString = route.substring(0);
        }
        return nakedString;
    }
}
const routeMatcher = new RouteMatcher(routes);
console.log(routeMatcher.matchRoute("/home"));

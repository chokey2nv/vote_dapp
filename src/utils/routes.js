import React from 'react';
import { routeNames } from "./routeNames"

/**
 * This is a mapping of route name with components
 * major used in application with many routes, so the APP.js file wont be much.
 * just have to map through the content to pass in Route (as implemented in APP.js).
 * 
 * Also made use of lazy loads to ease out loading of huge content and when needed
 */

const Vote = React.lazy(() => import("../components/Vote/Vote"));

export const routes = [
    { path : routeNames.vote, exact : true, component : Vote},
]
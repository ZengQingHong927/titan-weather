import      React                                               from 'react';

var     Home                    =                               React.lazy ( () => import ('../component/Home/Home'));


var routesConfig = [
        {path: '/',                             privs: [1000, 1200],        exact: true, component: Home},
        // {path: '/service',                      privs: [1000, 1300],        exact: true, component: Service},
];

export default routesConfig;
import          React                           from 'react';
import        { Fragment }                      from 'react';
import        { Suspense }                      from 'react';
import        { Switch }                        from 'react-router-dom';
import          PassRoute                       from '@/js/component/Generic/PassRoute';
import          LinearProgress                  from '@material-ui/core/LinearProgress';

import                                          '@/css/app.css';
import          theme                           from '@/js/theme/index';
import          ThemeProvider                   from '@material-ui/styles/ThemeProvider';
import        { BrowserRouter }                 from 'react-router-dom';

import        { AuthContextProvider }           from '@/js/component/ContextProvider/ThAuthContext';
import        { SnackerContextProvider }        from '@/js/component/ContextProvider/SnackBarCtx';
import          Admin                           from '@/js/component/Admin/Admin';
// import          Error404                        from '../src/js/component/Error404';


function App (props) {

        return (
                <Fragment>
                        <BrowserRouter>
                                <AuthContextProvider >
                                <SnackerContextProvider >
                                <ThemeProvider theme={theme}>
                                        <Suspense fallback={<LinearProgress />}>
                                                <Switch>
                                                        <PassRoute path='/' component={Admin} />
                                                        {/* <PassRoute exact path='/error' component={Error404} /> */}
                                                </Switch>
                                        </Suspense>
                                </ThemeProvider>
                                </SnackerContextProvider>
                                </AuthContextProvider>
                        </BrowserRouter>
                </Fragment>
        );
}
      


export default App;
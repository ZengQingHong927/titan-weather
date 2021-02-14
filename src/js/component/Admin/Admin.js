import          React                                   from 'react';
import        { Fragment }                              from 'react';
// import        { useState }                              from 'react';
// import        { useEffect }                             from 'react';
import          makeStyles                              from '@material-ui/core/styles/makeStyles';
// import          AppBar                                  from '@material-ui/core/AppBar';
// import          Grid                                    from '@material-ui/core/Grid';
// import          Typography                              from '@material-ui/core/Typography';
// import          Box                                     from '@material-ui/core/Box';

// import          PerfectScrollbar                        from 'react-perfect-scrollbar';
import          clsx                                    from 'clsx';
import        { useAuthCtx }                            from '@/js/component/ContextProvider/ThAuthContext';
import          routes                                  from '@/js/routeConfig/routes';
import        { Suspense }                              from 'react';
import          LinearProgress                          from '@material-ui/core/LinearProgress';
import        { renderRoutes }                          from 'react-router-config';
// import          useMediaQuery                           from '@material-ui/core/useMediaQuery';
// import          useTheme                                from '@material-ui/core/styles/useTheme';
// import          AppToolbar                              from '@/js/component/Home/AppToolbar';
// import          useToggle                               from '@/js/component/Generic/useToggle';
// import          FooterContainer                         from '@/js/component/Home/FooterContainer';
import          footerImageA                            from '@/image/footerA.jpg';



function Admin (props) {

        let     classes                 = useStyles ();
        let     authctx                 = useAuthCtx ();
        // let     theme                   = useTheme ();
        // let     matchSMBrk              = useMediaQuery (theme.breakpoints.down ('sm'));
        // let   [ visibleLoginDialog, toggleLoginDialog ] = useToggle (false);

        // 檢查token是否有效或登入
        if (!authctx.isLoggedIn) {
                // authctx.logOut ();
        }

        // let     authPrivs = [1300];

        // 路由權限
        // let     privRoutes = routes.filter (route => 
        //         route.privs.includes (1300)
        // );

        // console.log ('privRoutes', JSON.stringify (privRoutes, null, 4));

        return (
                <Fragment>
                        <div className={clsx ({[classes.root]: true})}>
                                {/* <AppBar position="static" elevation={0} style={{padding: '0 36px 0 36px', backgroundColor: '#1a237e'}}>
                                        <AppToolbar toggleLoginDialog={toggleLoginDialog} />
                                </AppBar> */}
                                <main className={classes.content}>
                                        <Suspense fallback={<LinearProgress />}>
                                                { renderRoutes (routes) }
                                        </Suspense>
                                </main>
                                {/* <div className={classes.footerWrapper}>
                                        <div className={classes.footerMask}>
                                                <FooterContainer matchSMBrk={matchSMBrk} />
                                        </div>
                                </div> */}
                        </div>
                </Fragment>
        );
}

var useStyles = makeStyles (theme => ({
        root: {
                height:                 '100%',
                // [theme.breakpoints.up('sm')]: {
                //         paddingTop:     64
                // },
        },
        item: {
                border:         '1px solid black',
                flex:           1,
        },
        footerWrapper: {
                position:                       'relative',
                height:                         '450px',
                backgroundImage:                `url(${footerImageA})`,
                [theme.breakpoints.down ('sm')]: {
                        height:                 '1000px'
                }
        },
        footerMask: {
                height:                         '100%',
                width:                          '100%',
                position:                       'absolute',
                left:                           0,
                right:                          0,
                backgroundColor:                'rgba(55,55,55,0.7)',
        },
}));

export default Admin;

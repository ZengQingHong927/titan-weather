'use strict'

import          React                                   from 'react';
import        { Fragment }                              from 'react';
import        { useState }                              from 'react';
import        { useEffect }                             from 'react';
import          makeStyles                              from '@material-ui/core/styles/makeStyles';
import          useTheme                                from '@material-ui/core/styles/useTheme';
import          Toolbar                                 from '@material-ui/core/Toolbar';
import          Button                                  from '@material-ui/core/Button';
// import          Grid                                    from '@material-ui/core/Grid';
import        { useAuthCtx }                            from '@/js/component/ContextProvider/ThAuthContext';
// import          OtcHttpHelper                           from '@/js/helper/OtcHttp.helper';
import          logo                                    from '@/image/plumber.jpg'
import          IconButton                              from '@material-ui/core/IconButton';
import          useMediaQuery                           from '@material-ui/core/useMediaQuery';
// import          Popper                                  from '@material-ui/core/Popper';
// import          Typography                              from '@material-ui/core/Typography';
// import          Paper                                   from '@material-ui/core/Paper';
import          useToggle                               from '@/js/component/Generic/useToggle';
// import        { useRef }                                from 'react';
import          Drawer                                  from '@material-ui/core/Drawer';
import          List                                    from '@material-ui/core/List';
import          ListItem                                from '@material-ui/core/ListItem';
// import          ListItemIcon                            from '@material-ui/core/ListItemIcon';
import          ListItemText                            from '@material-ui/core/ListItemText';
import          Divider                                 from '@material-ui/core/Divider';
import          MenuIcon                                from '@material-ui/icons/Menu';
import        { useHistory }                            from 'react-router-dom';



function NavBar (props) {

        let   { navCfgs }               = props;

        let     classes                 = useStyles ();
	let	history		        = useHistory ();

        let   [ navItemTexts, setNavItemTexts ]       = useState ([]);

        useEffect(() => {
                // console.log (navCfgs);

                setNavItemTexts (navCfgs)
        }, [navCfgs])

        function handleGoTo (item) {
                console.log ('handleGoTo');

                if ((item.tabVal === 'login' || item.tabVal === 'logout') && item.action) {
                        item.action ();
                }
                else {
                        history.push (`${item.href}`);
                }

        }

        return (
                <Fragment>
                        <div style={{alignSelf: 'center', position: 'absolute', right: 0, display: 'flex'}}>
                                {/* {navItemTexts.map ((item, idx) => (<Button key={item.label} className={classes.navBarBtn} color="inherit" onClick={() => handleGoTo (item)} variant='text'>{item.label}</Button>))} */}
                                {navItemTexts.map ((item, idx) => (<div key={item.label} className={classes.navBarBtn} onClick={() => handleGoTo (item)} >{item.label}</div>))}
                        </div>
                </Fragment>
        );
}

function NavDrawer (props) {

        let   { navCfgs }               = props;
	let	history		        = useHistory ();
        let   [ navItemTexts, setNavItemTexts ]       = useState ([]);

        useEffect(() => {
                console.log (navCfgs);

                setNavItemTexts (navCfgs)
        }, [navCfgs])

        function handleGoTo (item) {
                console.log ('handleGoTo');

                if ((item.tabVal === 'login' || item.tabVal === 'logout') && item.action) {
                        item.action ();
                }
                else {
                        history.push (`${item.href}`);
                }
        }

        return (
                <Fragment>
                        <div>
                                <List>
                                        {navItemTexts.map ((item, index) => (
                                                <Fragment  key={item.tabVal}>
                                                        <Divider />
                                                                <ListItem button onClick={(e) => handleGoTo (item)}>
                                                                        <ListItemText style={{textAlign: 'right'}} primary={item.label} />
                                                                </ListItem>
                                                        <Divider />
                                                </Fragment>
                                        ))}
                                </List>
                        </div>
                </Fragment>
        );
}

function AppToolbar (props) {

        let   { toggleLoginDialog }     = props;

        let     navCfgs         = [
                {val: 1, tabVal: 'home', label: 'Home', href: `/`},
                {val: 2, tabVal: 'service', label: 'Service', href: `/service`},
                {val: 3, tabVal: 'master', label: 'Master', href: `/master`},
                // {val: 4, tabVal: 'news', label: 'News', href: `/news`},
                {val: 5, tabVal: 'contact', label: 'Contact Us', href: `/contact`}
        ];

        let     classes                 = useStyles ();
        // let     menuRef                 = useRef (null);
        
        let     authctx                 = useAuthCtx ();
	let	history		        = useHistory ();
        let   [ openMenu, toggleOpenMenu ]      = useToggle (false);
        
        let     theme                   = useTheme ();
        let     matchSMBrk              = useMediaQuery (theme.breakpoints.down ('xs'));

        if (authctx.isLoggedIn) {
                let     logoutItem      = {val: 6, tabVal: 'logout', label: 'Logout', href: `/`, action: handleLogout};
                let     orderItem       = {val: 0, tabVal: 'order', label: 'Order', href: `/order`};

                navCfgs.splice (0, 0, logoutItem);
                navCfgs.splice (6, 0, orderItem);
        }
        else {
                console.log (`- loginItem ()`);

                let     loginItem       = {val: 6, tabVal: 'login', label: 'Login', href: `/login`, action: toggleLoginDialog};
                navCfgs.splice (6, 0, loginItem);
        }

        function handleLogout () {
                console.log (`- logout ()`);
                authctx.logOut ();

        }

        function goHome () {
                console.log (`- goHome ()`);

		history.push (`/`);
        }

        function handleClickMenu (e) {

                toggleOpenMenu ()
        }
        // console.log (authctx.isLoggedIn)
        // console.log (navCfgs)

        return (
                <Fragment>
                        <Toolbar className={classes.root}>
                                <img src={logo} style={{height: '40px'}} alt='logo' />
                                <Button style={{alignSelf: 'left'}} color="inherit" onClick={goHome}>BeePower</Button>
                                {!matchSMBrk ? <NavBar navCfgs={navCfgs} /> :
                                <IconButton className={classes.menuBtn} color="inherit" aria-label="Menu" onClick={handleClickMenu}>
                                        <MenuIcon />
                                </IconButton>}
                                <Drawer style={{transform: 'translateY(56px)'}} variant="temporary" anchor={theme.direction === 'rtl' ? 'right' : 'left'} open={openMenu} onClose={toggleOpenMenu} classes={{paper: classes.drawerPaper}} ModalProps={{keepMounted: true}}>
                                        <NavDrawer navCfgs={navCfgs} />
                                </Drawer>
                        </Toolbar>
                </Fragment>
        );
}


var useStyles = makeStyles (theme => ({
        root: {
                // position:                       'relative',
                // maxWidth:               1140,
                // margin:                 '0 auto'
                height:                         '56px'
        },
        navBarBtn: {
                marginRight:                            '16px',
                lineHeight:                             1.5,
                '&:hover': {
                        backgroundImage:                   'linear-gradient(to top, #69f0ae 20%, rgba(0,0,0,0) 20.1%)',
                        // backgroundColor:                theme.palette.success.main,
                        // textDecoration:                 'underline',
                        // textDecorationThickness:        '5px',
                        // textDecorationColor:            'red',
                        // borderBottom:                   '5px solid red',
                        // color:                          theme.palette.white,
                }   
        },
        menuBtn: {
                // flexGrow:                       1,
                position:                       'absolute',
                right:                          0,
        },
        menuPopper: {
                // position:                       'absolute',
        },
        drawerPaper: {
                width:                          160,
                // height:                         'calc(100%-48px)'
        },
}));

export default AppToolbar;
import          React                                   from 'react';
import        { Fragment }                              from 'react';
import        { useState }                              from 'react';
// import        { useEffect }                             from 'react';
import          makeStyles                              from '@material-ui/core/styles/makeStyles';
// import          AppBar                                  from '@material-ui/core/AppBar';
import          Grid                                    from '@material-ui/core/Grid';
// import          Typography                              from '@material-ui/core/Typography';
// import          Box                                     from '@material-ui/core/Box';
// import          CssBaseline                             from '@material-ui/core/CssBaseline';
// import          PerfectScrollbar                        from 'react-perfect-scrollbar';
// import          clsx                                    from 'clsx';
import          SearchBar                               from '@/js/component/Home/SearchBar'
// import          Paper                                   from '@material-ui/core/Paper';
import          Container                               from '@material-ui/core/Container';
import          WeatherInfo                             from '@/js/component/Weather/WeatherInfo';
import          QueryBar                                from '@/js/component/Home/QueryBar';

function Home (props) {

        const   classes = useStyles();
        // console.log ('react 2021')
        const [ wxDatas, setWxDatas ]                  = useState ([]);
        const [ clearWxInfo, toggleClearWxInfo ]       = useState (false);

        // console.log (wxDatas)

        return (
                <Fragment>
                        {/* <CssBaseline /> */}
                        <Container maxWidth='lg' className={classes.root}>
                                <Grid container spacing={3} direction="column" justify="center" alignItems="center">
                                        {/* <Grid item xs={12} style={{width: '100%'}}>
                                                <SearchBar />
                                        </Grid> */}
                                        <Grid item xs={12} style={{width: '100%'}}>
                                                <QueryBar setWxDatas={setWxDatas} toggleClearWxInfo={toggleClearWxInfo} />
                                        </Grid>
                                        <Grid item xs={12} style={{width: '100%'}}>
                                                <WeatherInfo wxDatas={wxDatas} clearWxInfo={clearWxInfo} setWxDatas={setWxDatas} />
                                        </Grid>
                                </Grid>
                        </Container>
                </Fragment>
        )
}

const useStyles = makeStyles((theme) => ({
        root: {
                padding: theme.spacing(4)
                // position: 'absolute',
                // alignItems: 'center',
                // width: 800,
                // height: '60px',
                // top: 0,
                // left: 0,
                // top: '50%',
                // transform: 'translate(0, -50%)'
        },
}));

export default Home
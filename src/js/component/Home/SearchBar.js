import          React                                   from 'react';
import        { Fragment }                              from 'react';
import        { useEffect }                             from 'react';
import        { useState }                              from 'react';
import          makeStyles                              from '@material-ui/core/styles/makeStyles';
import          Paper                                   from '@material-ui/core/Paper';
import          InputBase                               from '@material-ui/core/InputBase';
import          IconButton                              from '@material-ui/core/IconButton';
import          MenuIcon                                from '@material-ui/icons/Menu';
import          SearchIcon                              from '@material-ui/icons/Search';
// import          OtcHttpHelper                           from '@/js/helper/OtcHttp.helper'


function SearchBar () {
        const   classes = useStyles();

        const [ searchInput, setSearchInput ]   = useState ('');

        useEffect (() => {
                handleSearch ()
        }, [])


        async function handleSearch () {
                console.log (`handleSearch::`)

                // let     api     = 'http://127.0.0.1:3020/entry/read';

                // let     query1   = {
                //         phonenum: 136220375
                // }

                // let     query2   = {
                //         phonenum: 138478220
                // }

                // let	resobj	=
		// await OtcHttpHelper.engetA (api, query, 'query');

                // console.log (resobj)

                const invert  = p  => new Promise((res, rej) => p.then(rej, res));
                const firstOf = ps => invert(Promise.all(ps.map(invert)));

                // Utility routines used only in testing.
                // const wait1    = ms => OtcHttpHelper.engetA (api, query1, 'query');
                // const wait2    = ms => OtcHttpHelper.engetA (api, query2, 'query');
                // const wait    = ms => new Promise(res => setTimeout(() => res(ms), ms));
                const fail    = f  => Promise.reject(f);
                const log     = p  => p.then(v => console.log("pass", v), v => console.log("fail", v));

                // Test.
                // log(firstOf([wait1(1000), wait2(500) ]));
                // log(firstOf([wait1(1000), fail(100) ]));
                // log(firstOf([wait(1000), wait(500) ]));
                // log(firstOf([wait(1000), fail("f1")]));
                // log(firstOf([fail("f1"), fail("f2")]));



        }

        function onHandleChange (e) {
                console.log (`onHandleChange::${e.target.value}`)
                setSearchInput (e.target.value)
        }

        return (
                <Fragment>
                        <Paper className={classes.root}>
                                <IconButton className={classes.iconButton} aria-label="menu">
                                        <MenuIcon />
                                </IconButton>
                                <InputBase fullWidth className={classes.input} placeholder="Search Google Maps" inputProps={{ 'aria-label': 'search google maps' }} value={searchInput} onChange={onHandleChange} />
                                <IconButton onClick={handleSearch} className={classes.iconButton} aria-label="search">
                                        <SearchIcon />
                                </IconButton>
                        </Paper>
                </Fragment>
        );
}

const useStyles = makeStyles((theme) => ({
        root: {
                // position: 'absolute',
                padding: '2px 4px',
                // padding: theme.spacing (2),
                display: 'flex',
                alignItems: 'center',
                // width: 800,
                // height: '60px',
                // margin: '0 200px',
                // top: 0,
                // left: 0,
                // top: '50%',
                // transform: 'translate(0, -50%)'
        },
        input: {
                marginLeft: theme.spacing(1),
                height: '60px',
                // flex: 1,
                lineHeight: '60px',
        },
        iconButton: {
                padding: 10,
        },
}));

export default SearchBar
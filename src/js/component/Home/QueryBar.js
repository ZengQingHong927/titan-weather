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
import          OtcHttpHelper                           from '@/js/helper/OtcHttp.helper'
import          Chip                                    from '@material-ui/core/Chip';
import          Autocomplete                            from '@material-ui/lab/Autocomplete';
import          TextField                               from '@material-ui/core/TextField';
import          Grid                                    from '@material-ui/core/Grid';
import          GeoInfosHelper                          from '@/js/helper/GeoInfos.helper';
import          Checkbox                                from '@material-ui/core/Checkbox';
import          CheckBoxIcon                            from '@material-ui/icons/CheckBox';
import          CheckBoxOutlineBlankIcon                from '@material-ui/icons/CheckBoxOutlineBlank';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function QueryBar (props) {
        const   classes = useStyles();

        let   { setWxDatas,
                toggleClearWxInfo }    = props;

        const [ cityOpts, setCityOpts ]                         = useState (GeoInfosHelper.cityInfos());
        const [ citySelected, setCitySelected ]                 = useState ([]);
        const [ distOpts, setDistOpts ]                         = useState ([]);
        const [ distOptsSelected, setDistOptsSelected ]         = useState ([]);


        useEffect (() => {
                if (citySelected.length && distOptsSelected.length) {
                        handleSearch ()
                }
        }, [citySelected, distOptsSelected])


        // useEffect(() => {
        //         fetchUpslash ()
        // }, [])
        
        // async function fetchUpslash () {
                
        //         // let     api     = '/photos'
        //         let     api             = '/entry/weather/read';
        
        //         let     query   = {
        //                 dataid: "F-D0047-005",
        //                 weatherCodes: [],
        //                 districts: []
        //         }
                
        //         let	resobj	=
        //         await OtcHttpHelper.errPostA (api, query, 'request fail');
        //         // await OtcHttpHelper.engetA (api, undefined, 'request fail');
        
        //         console.log (resobj)
        // }

        async function handleSearch () {
                // console.log (citySelected)
                // console.log (distOptsSelected)

                let     api             = '/dev/entry/weather/read';
                // let     api             = 'http://127.0.0.1:3020/dev/entry/weather/read';
                // let     api             = 'https://hlxlxn1h24.execute-api.us-east-1.amazonaws.com/dev/entry/weather/read';
                
                let     nowTime         = new Date();
                let     query           = {
                        dataid:                 citySelected[0].dataid,
                        startTime:              nowTime.toISOString(),
                        districts:              distOptsSelected.map((item) => item.dataid),
                        weatherCodes:           ['T']
                };
                // console.log ('query', query)

                let	resobj	=
		await OtcHttpHelper.errPostA (api, query, 'City or districts not found');

                // console.log (resobj)
                
                let   { WeatherDistBasicInfos,
                        dataid,
                        city_name }             = resobj.item;


                setWxDatas ([{city_name, dataid, WeatherDistBasicInfos}])
                // console.log (distsInfos)
        }

        function onHandleChange (e, newValues, reason) {
                // console.log('onHandleChange', newValues)
                toggleClearWxInfo(false)
                // * clear all selection and query data
                if (!newValues.length) {
                        console.log (`onHandleChange::clear...`)
                        setDistOpts ([])
                        setDistOptsSelected ([])
                        setCitySelected ([])
                        toggleClearWxInfo (true)
                        return
                }

                let     distInfos;

                // * only one city can be selected and reset dist options
                if (reason === 'select-option' && newValues.length > 1) {
                        newValues.shift ()
                        setDistOptsSelected ([])
                }

                setCitySelected (newValues);

                let     target          = newValues[newValues.length-1]

                distInfos = GeoInfosHelper.districtInfos (target.dataid);
                distInfos = Object.keys(distInfos).map ((key) => ({label: distInfos[key], dataid: key}))
                // console.log (distInfos)
                setDistOpts (distInfos)
        }

        function onHandleChangeDistsOpt (e, newValue) {
                // console.log (newValue)
                setDistOptsSelected (newValue)
        }

        function renderOption (option) {
                
                // console.log ('renderOption', option)

                return (
                        <React.Fragment>
                                <span>
                                        {option.label}
                                </span>
                        </React.Fragment>
                )
        }

        function getOptionSelected (opt, value) {
                // console.log ('getOptionSelected', opt)
                // console.log ('getOptionSelected', value)

        }

        // console.log (distOpts)
        return (
                <Fragment>
                        <Paper className={classes.root}>
                                <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                                        <Grid item xs={6} style={{width: '100%'}}>
                                                <div className={classes.cityQuery}>
                                                        {/* <Autocomplete className={classes.labelInput} id="city-tags" options={GeoInfosHelper.cityInfos().map((option) => option.dataid)} renderTags={(value, getTagProps) => value.map((option, index) => (<Chip variant="outlined" label={option} {...getTagProps({ index })} />))} renderInput={(params) => (<TextField {...params} variant="filled" label="City" placeholder="city" />)} onChange={onHandleChange} renderOption={renderOption} /> */}
                                                        {/* <Autocomplete className={classes.labelInput} id="checkboxes-tags-demo" options={GeoInfosHelper.cityInfos()} disableCloseOnSelect getOptionLabel={(option) => option.label} renderOption={renderOption} renderInput={(params) => (<TextField {...params} variant="standard" label="Checkboxes" placeholder="Favorites" />)} onChange={onHandleChange} /> */}
                                                        <Autocomplete value={citySelected} multiple id="city" options={cityOpts} classes={{option: classes.option}} autoHighlight getOptionLabel={(option) => option.label} renderOption={renderOption} renderInput={(params) => (<TextField {...params} label="Choose a country" variant="outlined" inputProps={{...params.inputProps, autoComplete: 'new-password'}} />)} onChange={onHandleChange} />
                                                </div>
                                        </Grid>
                                        <Grid item xs={6} style={{width: '100%'}}>
                                                <div className={classes.cityQuery}>
                                                        {/* <Autocomplete className={classes.labelInput} multiple id="district-tags" options={GeoInfosHelper.cityInfos().map((option) => option.title)} defaultValue={[citys[13].title]} freeSolo renderTags={(value, getTagProps) => value.map((option, index) => (<Chip variant="outlined" label={option} {...getTagProps({ index })} />))} renderInput={(params) => (<TextField {...params} variant="filled" label="District" placeholder="district" />)} />
                                                        <Autocomplete className={classes.labelInput} multiple id="checkboxes-tags-demo" options={districts} disableCloseOnSelect getOptionLabel={(option) => option.label} renderOption={renderOption} renderInput={(params) => (<TextField {...params} variant="standard" label="Checkboxes" placeholder="Favorites" />)} onChange={onHandleChange} /> */}
                                                        {/* <Autocomplete id="country-select-demo" options={GeoInfosHelper.cityInfos()} classes={{option: classes.option}} autoHighlight getOptionLabel={(option) => option.label} renderOption={renderOption} renderInput={(params) => (<TextField {...params} label="Choose a country" variant="outlined" inputProps={{...params.inputProps, autoComplete: 'new-password'}} />)} /> */}
                                                        <Autocomplete value={distOptsSelected} multiple id="dist" options={distOpts} classes={{option: classes.option}} autoHighlight getOptionLabel={(option) => option.label} renderOption={renderOption} renderInput={(params) => (<TextField {...params} label="Choose a country" variant="outlined" inputProps={{...params.inputProps, autoComplete: 'new-password'}} />)} onChange={onHandleChangeDistsOpt} />
                                                </div>
                                        </Grid>
                                </Grid>
                        </Paper>
                </Fragment>
        );
}

const useStyles = makeStyles((theme) => ({
        root: {
                // position: 'absolute',
                padding:                theme.spacing (2),
                // padding: theme.spacing (2),
                // display:                'flex',
                // alignItems:             'center',
                // width: 800,
                // height: '60px',
                // margin: '0 200px',
                // top: 0,
                // left: 0,
                // top: '50%',
                // transform: 'translate(0, -50%)'
        },
        cityQuery: {
                // width:                  '100%',
                '& > * + *': {
                        marginTop:      theme.spacing (3),
                },
        },
        labelInput: {
                '& .MuiFilledInput-root': {
                        backgroundColor:        'white',
                }
        },
        input: {
                marginLeft:             theme.spacing (1),
                height:                 '60px',
                // flex: 1,
                lineHeight:             '60px',
        },
        iconButton: {
                padding:                10,
        },
        option: {
                fontSize:               15,
                '& > span': {
                        marginRight:    10,
                        fontSize:       18,
                },
        },
}));

export default QueryBar
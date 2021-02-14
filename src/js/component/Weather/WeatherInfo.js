import          React                                   from 'react';
import        { Fragment }                              from 'react';
import        { useState }                              from 'react';
import        { useEffect }                             from 'react';
import          makeStyles                              from '@material-ui/core/styles/makeStyles';
// import          AppBar                                  from '@material-ui/core/AppBar';
import          Grid                                    from '@material-ui/core/Grid';
import          Typography                              from '@material-ui/core/Typography';
// import          Box                                     from '@material-ui/core/Box';
// import          clsx                                    from 'clsx';
import          Paper                                   from '@material-ui/core/Paper';
import        { formatLocalDate }                       from '@/js/helper/Display.helper'
// import          Skeleton                                from '@material-ui/lab/Skeleton';

import          Card                            from '@material-ui/core/Card';
import          CardHeader                      from '@material-ui/core/CardHeader';
// import          CardActionArea                  from '@material-ui/core/CardActionArea';
// import          CardContent                     from '@material-ui/core/CardContent';
// import          CardMedia                       from '@material-ui/core/CardMedia';
import          colorRed                        from '@material-ui/core/colors/red';
import          Avatar                          from '@material-ui/core/Avatar';
import          IconButton                      from '@material-ui/core/IconButton';
// import          FavoriteIcon                    from '@material-ui/icons/Favorite';
// import          ShareIcon                       from '@material-ui/icons/Share';
// import          CardActions                     from '@material-ui/core/CardActions';
import          LaunchIcon                      from '@material-ui/icons/Launch';
// import        { useParams }                     from 'react-router-dom'
import          DisplayHelper                   from '@/js/helper/Display.helper'
import          Chart                           from 'react-apexcharts'
import 		Pagination 		        from '@material-ui/lab/Pagination';


function WeatherInfo (props) {


        const   classes         = useStyles();
        let   { wxDatas,
                setWxDatas,
                clearWxInfo }       = props;

        // const [ cityInfos, setCityInfos ]       = useState ({});
        // const   dateNow                         = new Date().toISOString()
        
        useEffect(() => {
                if (clearWxInfo) {
                        console.log ('clear...')
                        setWxDatas([])
                }
        }, [clearWxInfo])


        return (
                <Fragment>
                        {wxDatas.length ? wxDatas.map((item) => <WeatherInfoCity key={item.dataid} wxData={item} />) : null}
                </Fragment>
        )
}

function WeatherInfoCity (props) {
        const   classes                                 = useStyles();
        let   { wxData }                                = props;
        let     pageLimit                               = 2;
        const [ cityInfos, setCityInfos ]               = useState ({});
        const [ pageDistInfos, setPageCityInfos ]       = useState ([]);
        const [ pageidx, setPageIdx ]                   = useState (0);
        const [ count, setCount ]                       = useState ();
        const   dateNow                                 = new Date().toISOString()
        
        // console.log (`cityInfos::${JSON.stringify(wxData, null, 4)}`)

        useEffect(() => {
                initWxData (wxData)
        }, [wxData])

        useEffect(() => {
                if (pageidx >= 0 && cityInfos.WxInfos !== undefined) {
                        let     distInfos       = cityInfos.WxInfos.slice (pageidx*pageLimit, pageLimit*(pageidx+1))
                        setPageCityInfos (distInfos)
                }
        }, [pageidx, cityInfos])

        function initWxData (wxData_ovr) {

                let   { WeatherDistBasicInfos,
                        city_name,
                        dataid }         = wxData_ovr;
                // console.log ('WeatherDistBasicInfos', WeatherDistBasicInfos)
                
                // * 單一城市所有鄉鎮區天氣資訊
                let     filterDatas      = WeatherDistBasicInfos.map ((dist) => {
                        let   { district_name,
                                weather_code,
                                districtid,
                                times_data } = dist;

                        let     wxdata  = dataClean(times_data)
                        let     unit    = wxdata[0].unit

                        return { district_name, districtid, weather_code, wxdata, unit }
                
                });

                // * data clean for chart
                let     WxInfos         = filterDatas.map ((distWx) => {
                        
                        let   { district_name,
                                districtid,
                                unit,
                                weather_code,
                                wxdata }        = distWx
                        
                        let     options = {
                                chart: {
                                        height: 350,
                                        type: 'line',
                                        zoom: {
                                                enabled: true,
                                                // type: 'x',
                                        }
                                },
                                stroke: {
                                        curve: 'smooth'
                                },
                                fill: {
                                        type:'solid',
                                        opacity: [0.35, 1],
                                },
                                labels: wxdata.map((item) => item.dataTimeWk + ' ' + item.dataTimeHr),
                                markers: {
                                        size: 3
                                },
                                yaxis: [
                                        {
                                                title: {
                                                        text: unit,
                                                },
                                        },
                                        // {
                                        //         opposite: true,
                                        //         title: {
                                        //                 text: 'Series B',
                                        //         },
                                        // },
                                ],
                                tooltip: {
                                        shared: true,
                                        intersect: false,
                                        y: {
                                                formatter: function (y) {
                                                        if(typeof y !== "undefined") {
                                                                return  y.toFixed(0) + " points";
                                                        }
                                                        return y;
                                                }
                                        }
                                }
                        };
                
                        let     series = [
                                {
                                        name: 'TEAM A',
                                        type: 'area',
                                        data: wxdata.map((item) => item.value)
                                },
                                // {
                                //         name: 'TEAM B',
                                //         type: 'line',
                                //         data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43]
                                // }
                        ];


                        return { district_name, districtid, series, options }
                })

                let     cityWxInfos     = { city_name, dataid, WxInfos };
                let     totalPages      = Math.ceil (WxInfos.length/pageLimit)

                // console.log ('totalPages', totalPages)
                setCityInfos (cityWxInfos);
                setCount (totalPages);
                setPageIdx (0)
                // setPageCityInfos (WxInfos);
        }
        
        function onChangePage (e, page_ovr) {
                // console.log (` change page ${page_ovr}`)
                setPageIdx (page_ovr-1);
        }
        
        return (
                <Fragment>
                        <Paper className={classes.root}>
                                <Grid container justify='space-between'>
                                        <Grid item>
                                                <Typography variant="h3" component='span' >
                                                        Weather Informations
                                                </Typography>
                                        </Grid>
                                        <Grid item>
                                                <Typography variant="h3" component='span' >
                                                        {cityInfos.city_name || ''}
                                                </Typography>
                                        </Grid>
                                        <Grid item>
                                                <Typography variant="subtitle1" component='span' style={{textAlign: 'middle'}}>
                                                        {formatLocalDate(dateNow)}
                                                </Typography>
                                        </Grid>
                                </Grid>
                                <Grid container spacing={3} className={classes.wrapper}>
                                        {!!pageDistInfos.length && pageDistInfos.map ((distWx) => {
                                                return (<Grid key={distWx.districtid} item lg={6} md={6} xl={6} xs={12} className={classes.card} >
                                                        <WeatherInfoBasic distWx={distWx} dateNow={dateNow} />
                                                </Grid>)
                                        })}
                                </Grid>
                                <div className={classes.pagination}>
                                        <Pagination count={count} page={pageidx+1} onChange={onChangePage} />
                                </div>
                        </Paper>
                </Fragment>
        )
}

function WeatherInfoBasic (props) {

        let     classes         = useStyles ();
        let   { distWx,
                dateNow }       = props;


        return (
                <Fragment>
                        <Card className={classes.card}>
                                <CardHeader avatar={<Avatar aria-label="recipe" className={classes.avatar}>R</Avatar>} action={<IconButton aria-label="settings" onClick={()=>{}}><LaunchIcon /></IconButton>} title={distWx.district_name} subheader={DisplayHelper.formatMsgTime (dateNow)} />
                                <Chart options={distWx.options} series={distWx.series} />
                        </Card>
                </Fragment>
        )
}

function dataClean (items) {
        
        let     unitInfos       = {
                '攝氏度':       '&#8451;',
                '華氏度':       '&#8457;',
        }

        let     formatData      = items.map ((item) => {
                let     dataTimeWk      = DisplayHelper.formatLocalWeek(item.dataTime);
                let     dataTimeHr      = DisplayHelper.formatAMPM(item.dataTime, 'hrs');
                let   { value,
                        measures }      = item.elementValue[0];

                return { dataTimeWk, dataTimeHr, unit: measures, value}
        })

        return formatData;
}

const useStyles = makeStyles((theme) => ({
        root: {
                padding: theme.spacing(3)
        },
        avatar: {
                backgroundColor:                colorRed[500],
        },
        media: {
                height:                         100,
                //     paddingTop:                 '56.25%', // 16:9
        },
        cardDesccription: {
                textOverflow:                   'ellipsis',
                display:                        'box',
                lineHeight:                     1.5,
                lineClamp:                      3,
                boxOrient:                      'vertical',
                overflow:                       'hidden',
        },
        wrapper: {
                marginTop: theme.spacing (3)
        },
        pagination: {
                display: 		        'flex',
		// alignItems: 		        'center',
		justifyContent: 	        'center',
		'& > *': {
			marginTop:              theme.spacing(2),
		},
        },
}));

export default WeatherInfo;
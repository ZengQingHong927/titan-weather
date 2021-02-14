import          React                                   from 'react';
import        { Fragment }                              from 'react';
import        { useState }                              from 'react';
// import        { useEffect }                             from 'react';
import          makeStyles                              from '@material-ui/core/styles/makeStyles';
import          AppBar                                  from '@material-ui/core/AppBar';
import          Grid                                    from '@material-ui/core/Grid';
import          Button                                  from '@material-ui/core/Button';

import          List                                    from '@material-ui/core/List';
import          ListItem                                from '@material-ui/core/ListItem';
import          ListItemIcon                            from '@material-ui/core/ListItemIcon';
import          ListItemText                            from '@material-ui/core/ListItemText';

import          LocationOnIcon                          from '@material-ui/icons/LocationOn';
import          MailIcon                                from '@material-ui/icons/Mail';
import          PhoneEnabledIcon                        from '@material-ui/icons/PhoneEnabled';


function FooterContainer (props) {

        let   { matchSMBrk }                    = props;

        let     classes                         = useStyles ();


        return (
                <Fragment>
                        <Grid className={classes.footerContainer} container spacing={2} justify='space-around' direction={matchSMBrk ? 'column' : 'row'}>
                                <Grid item lg={4} md={4} xl={4} xs={12} >
                                        <div>
                                                <p style={{color: '#ffffff', fontWeight: 700}}>With professional movers,<br/>we provide the following services</p>
                                        </div>
                                        <div>
                                                <h3 style={{color: '#f9c649', fontSize: 36, lineHeight: 2, fontWeight: 700, fontFamily: 'Poppins'}}>(02)1234-5678</h3>
                                        </div>
                                        <Button className={classes.footerBtn}>
                                                REQUEST WITH ONLINE FORM
                                        </Button>
                                </Grid>
                                <Grid item lg={4} md={4} xl={4} xs={12} >
                                        <div>
                                                <h2 style={{color: '#f9c649', fontSize: 36, fontWeight: 700, fontFamily: 'Poppins'}}>USEFUL LINKS</h2>
                                        </div>
                                        <div style={{display: 'flex'}}>
                                                <List component="nav" className={classes.usefulLinks}>
                                                        <UsefulLinkItem />
                                                </List>
                                                <List component="nav" className={classes.usefulLinks}>
                                                        <UsefulLinkItem />
                                                </List>
                                        </div>
                                </Grid>
                                <Grid item lg={4} md={4} xl={4} xs={12} >
                                        <div>
                                                <h2 style={{color: '#f9c649', fontSize: 36, fontWeight: 700, fontFamily: 'Poppins'}}>ABOUT</h2>
                                        </div>
                                        <List component="ul" >
                                                <AboutItem />
                                        </List>
                                </Grid>
                        </Grid>
                </Fragment>
        );
}


function UsefulLinkItem (props) {

        let     linkCfg = [
                {label: 'HOME', cn: '#ffffff'},
                {label: 'CONTACT US', cn: '#ffffff'},
                {label: 'SERVICES', cn: '#ffffff'},
                {label: 'MASTERS', cn: '#ffffff'},
        ];

        return (
                <Fragment>
                        {linkCfg.map ((item, key) => {
                                return (
                                        <ListItem button key={key}>
                                                <ListItemText primary={<h4 style={{color: item.cn}}>{item.label}</h4>} />
                                        </ListItem>
                                );
                        })}
                </Fragment>
        );
}


function AboutItem (props) {

        let     classes                         = useStyles ();


        let     aboutCfg = [
                {label: 'TemplateMonster 24 Fifth st., Los Angeles, USA', cn: '#ffffff', icon: LocationOnIcon, content: ['TemplateMonster', '24 Fifth st., Los Angeles, USA']},
                {label: 'Email : name@yourmail.com', cn: '#ffffff', icon: MailIcon, content: ['Email : name@yourmail.com']},
                {label: `Phone : +12 (3) 456 0000 Support : +12 (3) 456 0000`, cn: '#ffffff', icon: PhoneEnabledIcon, content: ['Phone : +12 (3) 456 0000', 'Support : +12 (3) 456 0000']},
        ];

        return (
                <Fragment>
                        {aboutCfg.map ((item, key) => {
                                return (
                                        <Fragment key={key}>
                                                <div style={{display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.2)'}}>
                                                        <item.icon className={classes.aboutIcon} fontSize='default' />
                                                        <div style={{marginLeft: '16px', marginBottom: '16px'}}>
                                                                {item.content.map ((text, key2) => (<div key={key2} className={classes.aboutText}>{text}</div>))}
                                                        </div>
                                                </div>
                                        </Fragment>
                                );
                        })}
                </Fragment>
        );
}

var useStyles = makeStyles (theme => ({
        footerContainer: {
                position:                       'absolute',
                left:                           0,
                right:                          0,
                margin:                         'auto',
                width:                          '70%',
                top:                            '10vh'
        },
        footerBtn: {
                color:                          '#ffffff',
                border:                         '3px solid rgba(255,255,255,1)',
                '&:hover': {
                        backgroundColor:        '#acacac',
                }
        },
        usefulLinks: {
                flex:   1,
                // position:                       'relative',
        },
        aboutIcon: {
                color:                          '#F9C649',
                marginTop:                      4
        },
        aboutText: {
                color:                          '#ffffff',
                lineHeight:                     2,
                // marginBottom:                   theme.spacing (1),
                // fontSize:                       '1.1em',
                fontWeight:                     'bold'

        }
}));

export default FooterContainer;
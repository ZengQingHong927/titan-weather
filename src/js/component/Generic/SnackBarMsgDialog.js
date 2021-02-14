import          React                                           from 'react';
import        { Fragment }                                      from 'react';
// import        { useState }                                      from 'react';
// import        { useEffect }                                     from 'react';
// import          clsx                                            from 'clsx';
import          Button                                          from '@material-ui/core/Button';
import          Typography                                      from '@material-ui/core/Typography';
// import          makeStyles                                      from '@material-ui/core/styles/makeStyles';
import          DialogContent                                   from '@material-ui/core/DialogContent';
import          DialogActions                                   from '@material-ui/core/DialogActions';
import          Dialog                                          from '@material-ui/core/Dialog';
import          DialogTitleWithClose                            from './DialogTitleWithClose';


function SnackBarMsgDialog (props) {

        // let     classes         = useStyles ();

        let   { toggleDialogOpen, dialogOpen }      = props;
        // let   [ dialogOpen, toggleDialogOpen ]          = useState (true);


        function onCancel () {
                toggleDialogOpen (false);
        }

        return (
                <Fragment>
                        <Dialog onClose={onCancel} aria-labelledby="simple-dialog-title" open={dialogOpen} fullWidth={true} BackdropProps={{ invisible: true }}>
                                <DialogTitleWithClose title="Bravo Allxon Web Engineer" onClose={() => toggleDialogOpen (false)} />
                                <DialogContent dividers={true} >
                                        <Typography component="div" variant="subtitle1">Bravo Allxon Web Engineer</Typography>
                                </DialogContent>

                                <DialogActions>
                                        <Button variant="contained" color="primary" onClick={() => toggleDialogOpen(false)}>Cancel</Button>
                                </DialogActions>
                        </Dialog>
                </Fragment>
        );
}

// var useStyles = makeStyles ((theme) => ({
//         alert: {
//                 '& .MuiAlert-root': {
//                         width:          '100%'
//                 }
//         },
       
// }));

export default SnackBarMsgDialog;
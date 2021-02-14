import                  React                           from 'react';
import                { Fragment }                      from 'react';
// import                { useState }                      from 'react';
// import                { useEffect }                     from 'react';
// import                  clsx                            from 'clsx';
// import                  makeStyles                      from '@material-ui/core/styles/makeStyles';
// import 		        DialogTitle 			from '@material-ui/core/DialogTitle';

// import                  Button                          from '@material-ui/core/Button';
import                  IconButton                      from '@material-ui/core/IconButton';
import                  CloseIcon                       from '@material-ui/icons/Close';
import                  Typography                      from '@material-ui/core/Typography';
// import                  Box                             from '@material-ui/core/Box';
// import                  colorGrey                       from '@material-ui/core/colors/grey';
import                  withStyles                      from '@material-ui/core/styles/withStyles';
import                  MuiDialogTitle                  from '@material-ui/core/DialogTitle';


var     styles  = (theme) => ({
        root: {
                margin:         0,
                padding:        theme.spacing (2),
        },
        closeButton: {
                position:       'absolute',
                right:          theme.spacing (1),
                top:            theme.spacing (1),
                color:          theme.palette.grey[500],
        },
});
      
var DialogTitle = withStyles (styles)((props) => {
        let   { children,
                classes,
                onClose,
                ...other }      = props;

        return (
                <MuiDialogTitle disableTypography className={classes.root} {...other}>
                        <Typography variant="h3">{children}</Typography>
                        {onClose ? (
                                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                                        <CloseIcon />
                                </IconButton>
                        ) : null}
                </MuiDialogTitle>
        );
});


function DialogTitleWithClose (props) {
      
        let   { onClose,
                title }         = props;

      
        return (
                <Fragment>
                        <DialogTitle id="customized-dialog-title" onClose={onClose}>
                                {title}
                        </DialogTitle>
                </Fragment>
        );
}



export default DialogTitleWithClose;
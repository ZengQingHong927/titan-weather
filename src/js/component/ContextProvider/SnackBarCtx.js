import          React                           from 'react';
import        { useContext }                    from 'react';
import          Snackbar                        from '@material-ui/core/Snackbar';
import        { useState }                      from 'react';
import          Alert                           from '@material-ui/lab/Alert';
// import        { useEffect }                     from 'react';
// import          AlertTitle                      from '@material-ui/lab/AlertTitle';
import          Button                          from '@material-ui/core/Button';
// import          makeStyles                      from '@material-ui/styles/makeStyles';
import          SnackBarMsgDialog               from '../../component/Generic/SnackBarMsgDialog';
// import        { useAuthCtx }                    from './ThAuthContext';

// https://medium.com/@Whien/%E9%80%8F%E9%81%8E-react-usecontext-%E8%88%87-usereducer-%E4%BE%86%E5%81%9A-global-state-manager-bed30fb1f08b
var SnackerContext  = React.createContext ();

function SnackerContextProvider (props) {
        let   { children }    = props;
        // let     classes                 = useStyles ();

        // let   { isLoggedIn, logOut }    = useAuthCtx();

        let   [ snackbarOpen, toggleSnackerbarOpen ]    = useState (false);
        let   [ dialogOpen, toggleDialogOpen ]          = useState (false);
        let   [ snackerbarMsg, setSnackerBarMsg ]       = useState ('');
        let   [ snackerbarType, setSnackerBarType ]     = useState ('');

        let   [ , toggleAlertOpen ]            = useState (false);
        let   [ , setAlertMsg ]                 = useState ('');


        function showSnackerBarMsg (msg) {
                setSnackerBarMsg (msg.content);
                setSnackerBarType (msg.type)
                toggleSnackerbarOpen (true);
        }

        function showAlertMsg (msg) {
                setAlertMsg (msg);
                toggleAlertOpen (true);
        }

        function addToastForError (err, logoutForNoAuth) {
                showSnackerBarMsg (`[${err.status}] ${err.message || '未知錯誤'}`);
                // showSnackerBarMsg ({type: 'error', content: `[${err.status}] ${err.message || '未知錯誤'}`})
                
                // 進行登出
                // if (logoutForNoAuth && err.status === 520) {
                //         return logOut (true);
                // }
        }


        let     snackctx    = {
                snackbarOpen,
                toggleSnackerbarOpen,
                showSnackerBarMsg,
                showAlertMsg,
                addToastForError,
        };

        // console.log (`dialog :: ${dialogOpen}`)
        return (
                <SnackerContext.Provider value={snackctx}>
                        {children}
                        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} style={{width: '100%'}} open={snackbarOpen} autoHideDuration={3000} onClose={() => toggleSnackerbarOpen (false)} ClickAwayListenerProps={{onClickAway:() => {}}}>
                                <Alert style={{width: '100%'}} severity={snackerbarType} variant="filled" onClose={() => toggleSnackerbarOpen (false)}>
                                        <span id="id-message">{snackerbarType}&nbsp;&nbsp;{snackerbarMsg}</span>
                                        <Button variant='contained' size="medium" onClick={() => toggleDialogOpen(true)}>click</Button>
                                </Alert>
                        </Snackbar>
                        {dialogOpen && <SnackBarMsgDialog toggleDialogOpen={toggleDialogOpen} dialogOpen={dialogOpen} />}
                </SnackerContext.Provider>
        );

}

function useSnackbarCtx () {
        return useContext (SnackerContext);
}

// var useStyles = makeStyles ((theme) => ({
//         alert: {
//                 '& .MuiAlert-root': {
//                         width:          '100%'
//                 }
//         },
       
// }));


export {
        SnackerContextProvider,
        useSnackbarCtx
}

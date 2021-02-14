import          React                           from 'react';
// import        { useState }                      from 'react'
import        { useContext }                    from 'react';
import        { useLocalStorage }               from 'react-use';
// import        { useHistory }                    from 'react-router-dom';
import          OtcHttpHelper                   from '../../helper/OtcHttp.helper';



var     AuthContext     = React.createContext ();

// https://kentcdodds.com/blog/authentication-in-react-applications
function AuthContextProvider (props) {
        let   [ authInfo, setAuthInfo ] = useLocalStorage ('authInfo', {});
        // let     history                 = useHistory ();
        let   [ isLogin, setIsLogin ]   = useLocalStorage ('isLogin', '0');

        // all data operation like cookie, storage here
        function logIn (authInfo) {
                console.log ('user login');
                // console.log (`user login ${JSON.stringify (authInfo, null, 4)}`);
                setAuthInfo (authInfo);
                setIsLogin ('1');
                // history.push ('/');

        }

        // clear all data in cookie and storage here
        async function logOut () {
                console.log ('user logout');

                let     api     = 'http://localhost:3010/admin/account/logout2';

                let	resobj	=
		await OtcHttpHelper.enpostA (api, {}, '找不到數據');
                console.log (`logOut resobj ${JSON.stringify (resobj.item, null, 4)}`);


                // window.localStorage.clear ();
                setIsLogin ('0');
                setAuthInfo ({});
                // history.push ('/login');
        }

        function updateUserInfo (userinfo) {
                // console.log (`- context updateUserInfo ${JSON.stringify (userinfo)}`);

                Object.assign (authInfo, userinfo);
                setAuthInfo (authInfo);
        }

        let authctx     = {
                logIn,
                logOut,
                isLoggedIn:     isLogin === '0' ? false : true,
                userInfo:       authInfo,
                updateUserInfo,
        }

        return (
                <AuthContext.Provider value={authctx}>
                        {props.children}
                </AuthContext.Provider>
        )


}


function useAuthCtx () {
        return useContext (AuthContext);
}


export {
        AuthContextProvider,
        useAuthCtx,
};
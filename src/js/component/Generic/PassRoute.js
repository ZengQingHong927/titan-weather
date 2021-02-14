import React    from 'react';
import { Route } from 'react-router-dom';

function PassRoute (props) {
        let {
                component: Component,
                ...rest
        } = props;

        return (
                <Route {...rest} render={(props)=> <Component {...props} {...rest}/>} />
        );
}

export default PassRoute;
import          React                   from 'react';
import        { useCallback }           from 'react';
import        { useState }              from 'react';

function useToggle (initialState = false) {
        let   [ state, setState ]       = useState (initialState);
        let     toggle                  = useCallback (() => setState (state => !state), []);

        return [ state, toggle ];
}

export default useToggle;

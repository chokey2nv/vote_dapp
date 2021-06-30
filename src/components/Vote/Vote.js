import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
const style = makeStyles(({colors, breakpoints}) => ({
    root : {
        
    }
}))
export default function Vote () {
    const classes = style(),
        [state, _setState] = useState({}),
        {} = state,
        setState = _state => _setState(state=>({...state, ..._state}));
    return (
        <div className={classes.root}>
            
        </div>
    )
}
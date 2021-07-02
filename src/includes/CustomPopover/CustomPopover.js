import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem, makeStyles, Popover, withStyles } from '@material-ui/core'
import { customPopoverString, CUSTOM_POPOVER_REDUCER_NAME } from './config'
import { customPopoverActions } from './actions'
const style = makeStyles(theme => ({
    root : {},
    popover : {
        background : theme.colors.background,
        padding : "0px 10px",
        width : "auto"
    },
    button : {},
}))
export default function CustomGlobalPopover() {
    const dispatch = useDispatch(),
    customPopoverReducer = useSelector(state=>state[CUSTOM_POPOVER_REDUCER_NAME]),
    {
        [customPopoverString.anchorEl] : anchorEl,
        [customPopoverString.options] : options,
        [customPopoverString.customComponent] : CustomComponent,
        [customPopoverString.customListItem] : CustomListItem,
        [customPopoverString.onCloseCallback] : onCloseCallback,
        [customPopoverString.anchorOrigin] : anchorOrigin,
        [customPopoverString.props] : props,
        [customPopoverString.classes] : _classes,
    } = customPopoverReducer,
    classes = style();
    return (
        <Popover
            open={Boolean(anchorEl)}
            onClose={() => {
                customPopoverActions.close(dispatch);
                onCloseCallback && onCloseCallback();
            }}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical : 35,
                horizontal : "center",
                ...anchorOrigin
            }}
            anchorPosition={{
                
            }}
            classes={{
                paper : classes.popover,
                ..._classes,
            }}
            {...props}
        >
                {CustomComponent ? <CustomComponent/> : <List>
                    {options && options.map((item, index) => {
                        return CustomListItem ? <CustomListItem key={index} item={item}/> : 
                        <ListItem button>

                        </ListItem>
                    })}
                </List>}
        </Popover>
    )
}
function _CustomPopover({classes, anchorEl, onClose, anchorOrigin, ...props}) {
    return (
        <Popover
            open={Boolean(anchorEl)}
            onClose={onClose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical : 35,
                horizontal : "center",
                ...anchorOrigin
            }}
            classes={{
                paper : classes.popover,
            }}
            {...props}
        >
                {props.children}
        </Popover>
    )
}
_CustomPopover.propTypes = {
    
}
const CustomPopover = withStyles(style)(_CustomPopover);
export {CustomPopover};
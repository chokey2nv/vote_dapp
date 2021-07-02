import { customPopoverConstant } from "./config";

export const customPopoverActions ={
    close : dispatch => dispatch({
        type : customPopoverConstant.SET_CUSTOM_POPOVER_CLOSE
    }),
    payload : payload => dispatch => dispatch({
        type : customPopoverConstant.SET_CUSTOM_POPOVER,
        payload
    })
}
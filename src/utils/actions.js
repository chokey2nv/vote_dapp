import { utilConstants, utilStrings } from "./config";

export const utilActions = {
    processDisplay : (show=true, message, component) => dispatch => utilActions.payload({
        [utilStrings.processing] : show,
        [utilStrings.processComponent] : !show ? null : component,
        [utilStrings.processMsg] : !show ? null : message,
    })(dispatch),
    payload : payload => dispatch => dispatch({
        type : utilConstants.SET_UTILS,
        payload
    })
}
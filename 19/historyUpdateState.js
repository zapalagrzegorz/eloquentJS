"use strict";
function historyUpdateState(state, action) {
    if (action.undo == true) {
        if (state.done.length == 0)
            return state;
        return Object.assign({}, state, {
            picture: state.done[0],
            done: state.done.slice(1),
            doneAt: 0,
        });
    }
    if (action.picture && state.doneAt < Date.now() - 1000) {
        return Object.assign({}, state, action, {
            done: [state.picture, ...state.done],
            doneAt: Date.now(),
        });
    }
    return Object.assign({}, state, action);
}

import { combineReducers } from 'redux';
import produce from 'immer';
import { HYDRATE } from 'next-redux-wrapper';

import user from './user';
import post from './post';
import category from './category';
import postlist from './postlist';
import image from './image';

const rootReducer = combineReducers({
    index: (state: {} = {}, action) => {
        switch (action.type) {
            case HYDRATE: {
                return { ...state, action };
            }
            default: {
                return state;
            }
        }
    },
    user,
    post,
    category,
    postlist,
    image,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
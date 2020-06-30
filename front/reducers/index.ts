import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import user, { UserState } from './user';
import post, { PostState } from './post';
import category, { CategoryState } from './category';
import postlist, { PostListState } from './postlist';
import image, { ImageState } from './image';

interface State {
    user: UserState,
    post: PostState,
    category: CategoryState,
    postlist: PostListState,
    image: ImageState,
};

const rootReducer = (state: State, action: any) => {
    switch (action.type) {
        case HYDRATE: {
            return action.payload;
        }
        default: {
            const combineReducer = combineReducers({
                user,
                post,
                category,
                postlist,
                image,
            });
            return combineReducer(state, action);
        }
    }
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
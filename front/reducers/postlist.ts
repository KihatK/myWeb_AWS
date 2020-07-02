import produce from 'immer';
import moment from 'moment';

import { PostList } from '../util/postlist';

export type PostListState = {
    postList: PostList[],
};

export const initialState: PostListState = {  //안에 객체 {제목, 카테고리, 날짜, 조회수 } 들어갈꺼임
    postList: [],
};

export const GET_CATEGORY_POSTS_REQUEST = 'GET_CATEGORY_POSTS_REQUEST';
export const GET_CATEGORY_POSTS_SUCCESS = 'GET_CATEGORY_POSTS_SUCCESS';
export const GET_CATEGORY_POSTS_FAILURE = 'GET_CATEGORY_POSTS_FAILURE';

export interface GetCategoryPostsRequestAction {
    type: typeof GET_CATEGORY_POSTS_REQUEST,
    data: string,
};
interface GetCategoryPostsSuccessAction {
    type: typeof GET_CATEGORY_POSTS_SUCCESS,
    data: PostList[],
};
interface GetCategoryPostsFailureAction {
    type: typeof GET_CATEGORY_POSTS_FAILURE,
    error: any,
};

type PostListAction = 
    | GetCategoryPostsRequestAction | GetCategoryPostsSuccessAction | GetCategoryPostsFailureAction;

export default (state = initialState, action: PostListAction): PostListState => {
    return produce(state, (draft) => {
        switch (action.type) {
            case GET_CATEGORY_POSTS_REQUEST: {
                draft.postList = [];
                break;
            }
            case GET_CATEGORY_POSTS_SUCCESS: {
                action.data.forEach((p) => {
                    p.createdAt = moment(p.createdAt).format('YYYY-MM-DD HH:mm');
                    p.key = p.id.toString();
                    p.titles = [p.title, p.uuid];
                    draft.postList.push(p);
                });
                break;
            }
            case GET_CATEGORY_POSTS_FAILURE: {
                break;
            }
            default: {
                break;
            }
        }
    });
}
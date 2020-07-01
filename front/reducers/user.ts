import produce from 'immer';
import moment from 'moment';

export interface BookMarkType {
    id: number,
    uuid: string,
    title: string,
    scategory: string,
    view: number,
    createdAt: string,
    titles: string[],
    key: string | null, 
}

export type UserState = {
    me: { 
        nickname: string, 
        admin: boolean, 
        BookMarked: BookMarkType[],
    } | null,
    isLoggingIn: boolean,
    isLoggedIn: boolean,
    isLoggingInError: string,
    isSigningUp: boolean,
    isSignedUp: boolean,
    isSigningupError: string,
};

export const initialState: UserState = {
    me: null,
    isLoggingIn: false,
    isLoggedIn: false,
    isLoggingInError: '',
    isSigningUp: false,
    isSignedUp: false,
    isSigningupError: '',
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const BOOKMARK_POST_REQUEST = 'BOOKMARK_POST_REQUEST';
export const BOOKMARK_POST_SUCCESS = 'BOOKMARK_POST_SUCCESS';
export const BOOKMARK_POST_FAILURE = 'BOOKMARK_POST_FAILURE';

export const UNBOOKMARK_POST_REQUEST = 'UNBOOKMARK_POST_REQUEST';
export const UNBOOKMARK_POST_SUCCESS = 'UNBOOKMARK_POST_SUCCESS';
export const UNBOOKMARK_POST_FAILURE = 'UNBOOKMARK_POST_FAILURE';

export interface SignupData {
    userId: string,
    nickname: string,
    password: string,
};
export interface SignupRequestAction {
    type: typeof SIGN_UP_REQUEST,
    data: SignupData,
};
interface SignupSuccessAction {
    type: typeof SIGN_UP_SUCCESS,
};
interface SignupFailureAction {
    type: typeof SIGN_UP_FAILURE,
    error: any,
};

export interface LoginData {
    userId: string,
    password: string,
};
export interface LoginRequestAction {
    type: typeof LOG_IN_REQUEST,
    data: LoginData,
}
interface LoginSuccessAction {
    type: typeof LOG_IN_SUCCESS,
    data: {
        nickname: string,
        admin: boolean,
        BookMarked: BookMarkType[],
    },
};
interface LoginFailureAction {
    type: typeof LOG_IN_FAILURE,
    error: any,
};

export interface LogoutRequestAction {
    type: typeof LOG_OUT_REQUEST,
};
interface LogoutSuccessAction {
    type: typeof LOG_OUT_SUCCESS,
};
interface LogoutFailureAction {
    type: typeof LOG_OUT_FAILURE,
    error: any,
};

interface LoadUserRequestAction {
    type: typeof LOAD_USER_REQUEST,
};
interface LoadUserSuccessAction {
    type: typeof LOAD_USER_SUCCESS,
    data: {
        nickname: string,
        admin: boolean,
        BookMarked: BookMarkType[],
    },
};
interface LoadUserFailureAction {
    type: typeof LOAD_USER_FAILURE,
    error: any,
};

export interface BookmarkPostRequestAction {
    type: typeof BOOKMARK_POST_REQUEST,
    data: string,
};
interface BookmarkPostSuccessAction {
    type: typeof BOOKMARK_POST_SUCCESS,
    data: BookMarkType,
};
interface BookmarkPostFailureAction {
    type: typeof BOOKMARK_POST_FAILURE,
    error: any,
};

export interface UnbookmarkPostRequestAction {
    type: typeof UNBOOKMARK_POST_REQUEST,
    data: string,
};
interface UnbookmarkPostSuccessAction {
    type: typeof UNBOOKMARK_POST_SUCCESS,
    data: {
        id: number,
        uuid: string,
        title: string,
        scategory: string,
        view: number,
        createdAt: string,
    },
};
interface UnbookmarkPostFailureAction {
    type: typeof UNBOOKMARK_POST_FAILURE,
    error: any,
};

type UserAction = 
    | SignupRequestAction | SignupSuccessAction | SignupFailureAction
    | LoginRequestAction | LoginSuccessAction | LoginFailureAction
    | LogoutRequestAction | LogoutSuccessAction | LogoutFailureAction
    | LoadUserRequestAction | LoadUserSuccessAction | LoadUserFailureAction
    | BookmarkPostRequestAction | BookmarkPostSuccessAction | BookmarkPostFailureAction
    | UnbookmarkPostRequestAction | UnbookmarkPostSuccessAction | UnbookmarkPostFailureAction;

export default (state = initialState, action: UserAction): UserState => {
    return produce(state, (draft) => {
        switch (action.type) {
            case SIGN_UP_REQUEST: {
                draft.isSigningUp = true;
                draft.isSignedUp = false;
                draft.isSigningupError = '';
                break;
            }
            case SIGN_UP_SUCCESS: {
                draft.isSigningUp = false;
                draft.isSignedUp = true;
                break;
            }
            case SIGN_UP_FAILURE: {
                draft.isSigningUp = false;
                draft.isSignedUp = false;
                draft.isSigningupError = action.error;
                break;
            }
            case LOG_IN_REQUEST: {
                draft.isLoggingIn = true;
                draft.isLoggedIn = false;
                draft.isLoggingInError = '';
                break;
            }
            case LOG_IN_SUCCESS: {
                draft.isLoggingIn = false;
                draft.me = action.data;
                draft.isLoggedIn = true;
                break;
            }
            case LOG_IN_FAILURE: {
                draft.isLoggingIn = false;
                draft.isLoggedIn = false;
                draft.isLoggingInError = action.error;
                break;
            }
            case LOG_OUT_REQUEST: {
                break;
            }
            case LOG_OUT_SUCCESS: {
                draft.me = null;
                break;
            }
            case LOG_OUT_FAILURE: {
                break;
            }
            case LOAD_USER_REQUEST: {
                break;
            }
            case LOAD_USER_SUCCESS: {
                action.data.BookMarked.forEach((p) => {
                    p.createdAt = moment(p.createdAt).format('YYYY-MM-DD HH:mm');
                    p.key = p.id.toString();
                    p.titles = [p.title, p.uuid];
                });
                draft.me = action.data;
                break;
            }
            case LOAD_USER_FAILURE: {
                break;
            }
            case BOOKMARK_POST_REQUEST: {
                break;
            }
            case BOOKMARK_POST_SUCCESS: {
                action.data.createdAt = moment(action.data.createdAt).format('YYYY-MM-DD HH:mm');
                action.data.key = action.data.id.toString();
                action.data.titles = [action.data.title, action.data.uuid];
                draft.me?.BookMarked.unshift(action.data);
                break;
            }
            case BOOKMARK_POST_FAILURE: {
                break;
            }
            case UNBOOKMARK_POST_REQUEST: {
                break;
            }
            case UNBOOKMARK_POST_SUCCESS: {
                const index = draft.me?.BookMarked.findIndex(p => p.uuid === action.data.uuid) || 0;
                draft.me?.BookMarked.splice(index, 1);
                break;
            }
            case UNBOOKMARK_POST_FAILURE: {
                break;
            }
            default: {
                break;
            }
        }
    });
}
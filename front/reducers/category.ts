import produce from 'immer';

import { BcategoryType, ScategoryListType, ScategoriesType, ChangeBcategoryOrder } from '../util/category';

export type CategoryState = {
    bcategory: BcategoryType[],
    isAddingBcategory: boolean,
    scategoryList: ScategoryListType[],
};

export const initialState: CategoryState = {
    bcategory: [],
    isAddingBcategory: false,
    scategoryList: [],
};

export const ADD_BCATEGORY_REQUEST = 'ADD_BCATEGORY_REQUEST';
export const ADD_BCATEGORY_SUCCESS = 'ADD_BCATEGORY_SUCCESS';
export const ADD_BCATEGORY_FAILURE = 'ADD_BCATEGORY_FAILURE';

export const ADD_SCATEGORY_REQUEST = 'ADD_SCATEGORY_REQUEST';
export const ADD_SCATEGORY_SUCCESS = 'ADD_SCATEGORY_SUCCESS';
export const ADD_SCATEGORY_FAILURE = 'ADD_SCATEGORY_FAILURE';

export const GET_BCATEGORY_REQUEST = 'GET_BCATEGORY_REQUEST';
export const GET_BCATEGORY_SUCCESS = 'GET_BCATEGORY_SUCCESS';
export const GET_BCATEGORY_FAILURE = 'GET_BCATEGORY_FAILURE';

export const GET_SCATEGORYLIST_REQUEST = 'GET_SCATEGORYLIST_REQUEST';
export const GET_SCATEGORYLIST_SUCCESS = 'GET_SCATEGORYLIST_SUCCESS';
export const GET_SCATEGORYLIST_FAILURE = 'GET_SCATEGORYLIST_FAILURE';

export const CHANGE_BCATEGORY_ORDER_REQUEST = 'CHANGE_BCATEGORY_ORDER_REQUEST';
export const CHANGE_BCATEGORY_ORDER_SUCCESS = 'CHANGE_BCATEGORY_ORDER_SUCCESS';
export const CHANGE_BCATEGORY_ORDER_FAILURE = 'CHANGE_BCATEGORY_ORDER_FAILURE';

export const EDIT_BCATEGORY_REQUEST = 'EDIT_BCATEGORY_REQUEST';
export const EDIT_BCATEGORY_SUCCESS = 'EDIT_BCATEGORY_SUCCESS';
export const EDIT_BCATEGORY_FAILURE = 'EDIT_BCATEGORY_FAILURE';

export const REMOVE_BCATEGORY_REQUEST = 'REMOVE_BCATEGORY_REQUEST';
export const REMOVE_BCATEGORY_SUCCESS = 'REMOVE_BCATEGORY_SUCCESS';
export const REMOVE_BCATEGORY_FAILURE = 'REMOVE_BCATEGORY_FAILURE';

export const EDIT_SCATEGORY_REQUEST = 'EDIT_SCATEGORY_REQUEST';
export const EDIT_SCATEGORY_SUCCESS = 'EDIT_SCATEGORY_SUCCESS';
export const EDIT_SCATEGORY_FAILURE = 'EDIT_SCATEGORY_FAILURE';

export const REMOVE_SCATEGORY_REQUEST = 'REMOVE_SCATEGORY_REQUEST';
export const REMOVE_SCATEGORY_SUCCESS = 'REMOVE_SCATEGORY_SUCCESS';
export const REMOVE_SCATEGORY_FAILURE = 'REMOVE_SCATEGORY_FAILURE';

export interface AddBcategoryRequestAction {
    type: typeof ADD_BCATEGORY_REQUEST,
    data: string,
    order: number,
};
interface AddBcategorySuccessAction {
    type: typeof ADD_BCATEGORY_SUCCESS,
    data: BcategoryType,
};
interface AddBcategoryFailureAction {
    type: typeof ADD_BCATEGORY_FAILURE,
    error: any,
};

export interface AddScategoryRequestAction {
    type: typeof ADD_SCATEGORY_REQUEST,
    data: string,
    order: number,
    Bcategory: string,
};
interface AddScategorySuccessAction {
    type: typeof ADD_SCATEGORY_SUCCESS,
    data: ScategoriesType,
    Bcategory: string,
};
interface AddScategoryFailureAction {
    type: typeof ADD_SCATEGORY_FAILURE,
    error: any
}

export interface GetBcategoryRequestAction {
    type: typeof GET_BCATEGORY_REQUEST,
};
interface GetBcategorySuccessAction {
    type: typeof GET_BCATEGORY_SUCCESS,
    data: BcategoryType[],
};
interface GetBcategoryFailureAction {
    type: typeof GET_BCATEGORY_FAILURE,
    error: any,
}

export interface GetScategoryListRequestAction {
    type: typeof GET_SCATEGORYLIST_REQUEST,
};
interface GetScategoryListSuccessAction {
    type: typeof GET_SCATEGORYLIST_SUCCESS,
    data: ScategoryListType[],
};
interface GetScategoryListFailureAction {
    type: typeof GET_SCATEGORYLIST_FAILURE,
    error: any,
};

export interface ChangeBcategoryOrderRequestAction {
    type: typeof CHANGE_BCATEGORY_ORDER_REQUEST,
    data: ChangeBcategoryOrder,
};
interface ChangeBcategoryOrderSuccessAction {
    type: typeof CHANGE_BCATEGORY_ORDER_SUCCESS,
}
interface ChangeBcategoryOrderFailureAction {
    type: typeof CHANGE_BCATEGORY_ORDER_FAILURE,
    error: any,
};

export interface EditBcategoryRequestAction {
    type: typeof EDIT_BCATEGORY_REQUEST,
    data: string,
    newCategory: string,
};
interface EditBcategorySuccessAction {
    type: typeof EDIT_BCATEGORY_SUCCESS,
};
interface EditBcategoryFailureAction {
    type: typeof EDIT_BCATEGORY_FAILURE,
    error: any,
};

export interface RemoveBcategoryRequestAction {
    type: typeof REMOVE_BCATEGORY_REQUEST,
    data: string,
};
interface RemoveBcategorySuccessAction {
    type: typeof REMOVE_BCATEGORY_SUCCESS,
};
interface RemoveBcategoryFailureAction {
    type: typeof REMOVE_BCATEGORY_FAILURE,
    error: any,
};

export interface EditScategoryRequestAction {
    type: typeof EDIT_SCATEGORY_REQUEST,
    data: string,
    newCategory: string,
};
interface EditScategorySuccessAction {
    type: typeof EDIT_SCATEGORY_SUCCESS,
};
interface EditScategoryFailureAction {
    type: typeof EDIT_SCATEGORY_FAILURE,
    error: any,
};

export interface RemoveScategoryRequestAction {
    type: typeof REMOVE_SCATEGORY_REQUEST,
    data: string,
};
interface RemoveScategorySuccessAction {
    type: typeof REMOVE_SCATEGORY_SUCCESS,
};
interface RemoveScategoryFailureAction {
    type: typeof REMOVE_SCATEGORY_FAILURE,
    error: any,
};

type CategoryAction = 
    | AddBcategoryRequestAction | AddBcategorySuccessAction | AddBcategoryFailureAction
    | AddScategoryRequestAction | AddScategorySuccessAction | AddScategoryFailureAction
    | GetBcategoryRequestAction | GetBcategorySuccessAction | GetBcategoryFailureAction
    | GetScategoryListRequestAction | GetScategoryListSuccessAction | GetScategoryListFailureAction
    | ChangeBcategoryOrderRequestAction | ChangeBcategoryOrderSuccessAction | ChangeBcategoryOrderFailureAction
    | EditBcategoryRequestAction | EditBcategorySuccessAction | EditBcategoryFailureAction
    | RemoveBcategoryRequestAction | RemoveBcategorySuccessAction | RemoveBcategoryFailureAction
    | EditScategoryRequestAction | EditScategorySuccessAction | EditScategoryFailureAction
    | RemoveScategoryRequestAction | RemoveScategorySuccessAction | RemoveScategoryFailureAction;

export default (state = initialState, action: CategoryAction): CategoryState => {
    return produce(state, (draft) => {
        switch (action.type) {
            case GET_BCATEGORY_REQUEST: {
                draft.bcategory = [];
                break;
            }
            case GET_BCATEGORY_SUCCESS: {
                action.data.forEach((category) => {
                    draft.bcategory.push(category);
                });
                break;
            }
            case GET_BCATEGORY_FAILURE: {
                break;
            }
            case ADD_BCATEGORY_REQUEST: {
                draft.isAddingBcategory = true;
                break;
            }
            case ADD_BCATEGORY_SUCCESS: {
                draft.bcategory.push(action.data);
                draft.isAddingBcategory = false;
                break;
            }
            case ADD_BCATEGORY_FAILURE: {
                draft.isAddingBcategory = false;
                break;
            }
            case ADD_SCATEGORY_REQUEST: {
                break;
            }
            case ADD_SCATEGORY_SUCCESS: {
                const index = draft.bcategory.findIndex(v => v.name === action.Bcategory);
                draft.bcategory[index]?.Scategories.push(action.data);
                break;
            }
            case ADD_SCATEGORY_FAILURE: {
                break;
            }
            case GET_SCATEGORYLIST_REQUEST: {
                draft.scategoryList = [];
                break;
            }
            case GET_SCATEGORYLIST_SUCCESS: {
                action.data.forEach(c => {
                    draft.scategoryList.push(c);
                });
                break;
            }
            case GET_SCATEGORYLIST_FAILURE: {
                break;
            }
            case CHANGE_BCATEGORY_ORDER_REQUEST: {
                break;
            }
            case CHANGE_BCATEGORY_ORDER_SUCCESS: {
                break;
            }
            case CHANGE_BCATEGORY_ORDER_FAILURE: {
                break;
            }
            case EDIT_BCATEGORY_REQUEST: {
                break;
            }
            case EDIT_BCATEGORY_SUCCESS: {
                break;
            }
            case EDIT_BCATEGORY_FAILURE: {
                break;
            }
            case REMOVE_BCATEGORY_REQUEST: {
                break;
            }
            case REMOVE_BCATEGORY_SUCCESS: {
                break;
            }
            case REMOVE_BCATEGORY_FAILURE: {
                break;
            }
            case EDIT_SCATEGORY_REQUEST: {
                break;
            }
            case EDIT_SCATEGORY_SUCCESS: {
                break;
            }
            case EDIT_SCATEGORY_FAILURE: {
                break;
            }
            case REMOVE_SCATEGORY_REQUEST: {
                break;
            }
            case REMOVE_SCATEGORY_SUCCESS: {
                break;
            }
            case REMOVE_SCATEGORY_FAILURE: {
                break;
            }
            default: {
                break;
            }
        }
    });
}
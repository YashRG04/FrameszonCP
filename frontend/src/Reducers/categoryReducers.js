import { ALL_CATEGORIES_FAIL, ALL_CATEGORIES_REQUEST, ALL_CATEGORIES_SUCCESS, CLEAR_ERRORS, DELETE_CATEGORIES_FAIL, DELETE_CATEGORIES_REQUEST, DELETE_CATEGORIES_RESET, DELETE_CATEGORIES_SUCCESS, NEW_CATEGORIES_FAIL, NEW_CATEGORIES_REQUEST, NEW_CATEGORIES_RESET, NEW_CATEGORIES_SUCCESS, UPDATE_CATEGORIES_FAIL, UPDATE_CATEGORIES_REQUEST, UPDATE_CATEGORIES_RESET, UPDATE_CATEGORIES_SUCCESS } from "../Constants/categoriesConstants";

export const allCategory = (state = { categories: [] }, action) => {
    switch (action.type) {

        case UPDATE_CATEGORIES_REQUEST:
        case DELETE_CATEGORIES_REQUEST:
        case NEW_CATEGORIES_REQUEST:
        case ALL_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };

        case UPDATE_CATEGORIES_SUCCESS:
        case DELETE_CATEGORIES_SUCCESS:
        case NEW_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                isChanged: true,
            }

        case UPDATE_CATEGORIES_FAIL:
        case DELETE_CATEGORIES_FAIL:
        case NEW_CATEGORIES_FAIL:
        case ALL_CATEGORIES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case NEW_CATEGORIES_RESET:
        case UPDATE_CATEGORIES_RESET:
        case DELETE_CATEGORIES_RESET:
            return {
                ...state,
                isChanged: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
import { ALL_CATEGORIES_FAIL, ALL_CATEGORIES_REQUEST, ALL_CATEGORIES_SUCCESS, DELETE_CATEGORIES_FAIL, DELETE_CATEGORIES_REQUEST, DELETE_CATEGORIES_SUCCESS, NEW_CATEGORIES_FAIL, NEW_CATEGORIES_REQUEST, NEW_CATEGORIES_SUCCESS, UPDATE_CATEGORIES_FAIL, UPDATE_CATEGORIES_REQUEST, UPDATE_CATEGORIES_SUCCESS } from "../Constants/categoriesConstants.js";

import { API } from "./API_URL.js";

// Get All Categories
export const getCategories = () => async(dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORIES_REQUEST });

        const res = await API.get("/api/categories/");

        dispatch({
            type: ALL_CATEGORIES_SUCCESS,
            payload: res.data,
        });

    } catch (error) {
        dispatch({
            type: ALL_CATEGORIES_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Create a category
export const createCategory = (link, name, images = []) => async(dispatch) => {
    try {
        dispatch({ type: NEW_CATEGORIES_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };

        if (images && images.length) {
            const { data } = await API.post(`/api/categories/${link}`, { name: name, images: images }, config);
        } else {
            const { data } = await API.post(`/api/categories/${link}`, { name: name }, config);
        }

        dispatch({ type: NEW_CATEGORIES_SUCCESS });

    } catch (error) {
        dispatch({
            type: NEW_CATEGORIES_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Category
export const deleteCategory = (link, id) => async(dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORIES_REQUEST });

        const { data } = await API.delete(`/api/categories/${link}/${id}`, { withCredentials: true });

        dispatch({ type: DELETE_CATEGORIES_SUCCESS });

    } catch (error) {
        dispatch({
            type: DELETE_CATEGORIES_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Category
export const updateCategory = (link, id, newName, newImages = []) => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_CATEGORIES_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };

        if (newImages && newImages.length) {
            const { data } = await API.put(`/api/categories/${link}/${id}`, { name: newName, images: newImages }, config);
        } else {
            const { data } = await API.put(`/api/categories/${link}/${id}`, { name: newName }, config);
        }

        dispatch({ type: UPDATE_CATEGORIES_SUCCESS });

    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORIES_FAIL,
            payload: error.response.data.message,
        });
    }
};
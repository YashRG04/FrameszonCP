import { API } from "./API_URL.js";

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS,
} from "../Constants/productsConstants.js";

// Get All Products
export const getProducts = (keyword = "", currentPage = 1, price = [0, 25000], category = [], gender = [], brand = [], shape = [], special = []) =>
    async(dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCT_REQUEST });

            let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

            if (category.length) {
                link = link + `&category[in]=${category}`;
            }
            if (gender.length) {
                link = link + `&gender[in]=${gender}`;
            }
            if (brand.length) {
                link = link + `&brand[in]=${brand}`;
            }
            if (shape.length) {
                link = link + `&shape[in]=${shape}`;
            }
            if (special.length) {
                link = link + `&special[in]=${special}`;
            }

            const { data } = await API.get(link);

            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        }
    };

// Get All Products For Admin
export const getAdminProducts = (keyword = "", currentPage = 1, price = [0, 25000], category = [], gender = [], brand = [], shape = [], special = []) =>
    async(dispatch) => {
        try {
            dispatch({ type: ADMIN_PRODUCT_REQUEST });

            let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

            if (category.length) {
                link = link + `&category[in]=${category}`;
            }
            if (gender.length) {
                link = link + `&gender[in]=${gender}`;
            }
            if (brand.length) {
                link = link + `&brand[in]=${brand}`;
            }
            if (shape.length) {
                link = link + `&shape[in]=${shape}`;
            }
            if (special.length) {
                link = link + `&special[in]=${special}`;
            }

            const { data } = await API.get(link, { withCredentials: true });

            dispatch({
                type: ADMIN_PRODUCT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ADMIN_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        }
    };

// Create Product
export const createProduct = (productData) => async(dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };

        // console.log(productData.getAll("images"));

        const { data } = await API.post(`/api/products/create`, productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Product
export const updateProduct = (id, productData) => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        // for (const pair of productData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }

        const { data } = await API.put(
            `/api/products/update/${id}`,
            productData,
            config
        );

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Product
export const deleteProduct = (id) => async(dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await API.delete(`/api/products/delete/${id}`, { withCredentials: true });

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Products Details
export const getProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await API.get(`/api/products/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clearing Errors
export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

// NEW REVIEW

// export const newReview = (reviewData) => async(dispatch) => {
//     try {
//         dispatch({ type: NEW_REVIEW_REQUEST });

//         const config = {
//             headers: { "Content-Type": "application/json" },
//         };

//         const { data } = await API.put(`/api/review`, reviewData, config);

//         dispatch({
//             type: NEW_REVIEW_SUCCESS,
//             payload: data.success,
//         });
//     } catch (error) {
//         dispatch({
//             type: NEW_REVIEW_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };

// // Get All Reviews of a Product
// export const getAllReviews = (id) => async(dispatch) => {
//     try {
//         dispatch({ type: ALL_REVIEW_REQUEST });

//         const { data } = await API.get(`/api/reviews?id=${id}`);

//         dispatch({
//             type: ALL_REVIEW_SUCCESS,
//             payload: data.reviews,
//         });
//     } catch (error) {
//         dispatch({
//             type: ALL_REVIEW_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };

// // Delete Review of a Product
// export const deleteReviews = (reviewId, productId) => async(dispatch) => {
//     try {
//         dispatch({ type: DELETE_REVIEW_REQUEST });

//         const { data } = await API.delete(
//             `/api/reviews?id=${reviewId}&productId=${productId}`
//         );

//         dispatch({
//             type: DELETE_REVIEW_SUCCESS,
//             payload: data.success,
//         });
//     } catch (error) {
//         dispatch({
//             type: DELETE_REVIEW_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };
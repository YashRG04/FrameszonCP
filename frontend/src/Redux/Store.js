import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, productDetailsReducer, productsChangesReducer, productsReducer } from "../Reducers/productsReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "../Reducers/userReducers";
import { allCategory } from "../Reducers/categoryReducers";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    profile: profileReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    newProduct: newProductReducer,
    productsChanges: productsChangesReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    categories: allCategory,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
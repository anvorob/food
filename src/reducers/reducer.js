import {FETCH_RECIPIES,FETCH_RECIPE,SAVE_RECIPE,DELETE_RECIPE,FETCH_CATEGORIES,FETCH_MISC,FETCH_SEARCH,CREATE_USER,USER_LOGIN,USER_LOGOUT,SET_FAVOURITE} from '../actions/types';

const initialState = {
    
  };

export default function(state = initialState, action) {

    switch (action.type) {
        case FETCH_RECIPIES:
        //console.log(action);
        return {
            ...state,
            recipes: action.payload
        };

        case FETCH_RECIPE:
        console.log(action);
        return {
            ...state,
            recipe: action.payload
        };
       
        case SAVE_RECIPE:
            console.log(action);
            return {
                ...state,
                srecipe: action.payload
            };
           
        case DELETE_RECIPE:
            console.log(action);
            return {
                ...state,
                srecipe: action.payload
            };
        case FETCH_CATEGORIES:
            console.log(action);
            return {
                ...state,
                categories: action.payload
            };
        case FETCH_MISC:
            console.log(action);
            return {
                ...state,
                misc: action.payload
            };
        case FETCH_SEARCH:
            console.log(action);
            return {
                ...state,
                search: action.payload
            };
        case SET_FAVOURITE:
            console.log(action);
            return {
                ...state,
                favourite: action.payload
            };
            
        case USER_LOGIN:
            console.log(action);
            return {
                ...state,
                user: action.payload
            };
        case USER_LOGOUT:
            console.log(action);
            return {
                ...state,
                user: action.payload
            };
        case CREATE_USER:
            console.log(action);
            return {
                ...state,
                user: action.payload
            };
        default:
        return state;
    }
    }
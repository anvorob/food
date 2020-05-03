import {FETCH_RECIPIES,FETCH_RECIPE,SAVE_RECIPE,DELETE_RECIPE,FETCH_CATEGORIES} from '../actions/types';

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
        default:
        return state;
    }
    }
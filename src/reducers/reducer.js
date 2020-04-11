import {FETCH_RECIPIES,FETCH_RECIPE,FETCH_CATEGORIES} from '../actions/types';

const initialState = {
    currency: [],
    baseCurrency: "",
    mutualFunds:[]
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
       

           
        default:
        return state;
    }
    }
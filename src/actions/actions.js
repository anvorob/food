import {FETCH_RECIPIES,
    FETCH_RECIPE,
    FETCH_CATEGORIES} from './types';
import tickersList1 from '../assets/recepes.json';

    export const fetchRecipies=()=>dispatch=>{
        console.log("fetchRecipies")
        console.log(tickersList1.recipies);
        dispatch({
                    type: FETCH_RECIPIES,
                    payload: tickersList1.recipies
                  })
        // fetch("https://api.spoonacular.com/recipes/search?query=cheese&number=2&apiKey=3262298f26124a46a17ff9ada1b84230")
        //     .then(res=>res.json()).then(post=>dispatch({
        //         type: FETCH_RECIPIES,
        //         payload: post
        //       }));
    };

    export const fetchRecipe=()=>dispatch=>{
        console.log("fetchRecipe")
        
        dispatch({
                    type: FETCH_RECIPE,
                    payload: tickersList1.recipies[0]
                  })
        // fetch("https://api.spoonacular.com/recipes/search?query=cheese&number=2&apiKey=3262298f26124a46a17ff9ada1b84230")
        //     .then(res=>res.json()).then(post=>dispatch({
        //         type: FETCH_RECIPIES,
        //         payload: post
        //       }));
    };

    export const saveRecipe=(recipeObj)=>dispatch=>{
        console.log("saveRecipe")
        
        console.log(recipeObj);
        // fetch("https://api.spoonacular.com/recipes/search?query=cheese&number=2&apiKey=3262298f26124a46a17ff9ada1b84230")
        //     .then(res=>res.json()).then(post=>dispatch({
        //         type: FETCH_RECIPIES,
        //         payload: post
        //       }));
    };
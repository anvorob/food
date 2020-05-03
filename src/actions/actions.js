import {FETCH_RECIPIES,
    FETCH_RECIPE,SAVE_RECIPE,
    FETCH_CATEGORIES} from './types';


let baseUrl = "https://vorobiovcompanyapi.azurewebsites.net/v1/Recipe/";
let localUrl = "https://localhost:44320/v1/Recipe/";
let proxyUrl = "https://cors-anywhere.herokuapp.com/";
    export const fetchRecipies=()=>dispatch=>{
        console.log("fetchRecipies")
        
        fetch(proxyUrl+baseUrl)
            .then(res=>res.json()).then(post=>dispatch({
                type: FETCH_RECIPIES,
                payload: post
              }));
    };

    export const fetchRecipe=(recipeID)=>dispatch=>{
        console.log("fetchRecipe")
        
        fetch(proxyUrl+baseUrl+recipeID)
            .then(res=>res.json()).then(post=>dispatch({
                type: FETCH_RECIPE,
                payload: post
              }));
    };

    export const saveRecipe=(recipeObj)=>dispatch=>{
        
        console.log("saveRecipe",recipeObj);
        // fetch(proxyUrl+baseUrl,{
        //     method: 'post',
        //     body: JSON.stringify(recipeObj)
        //   })
        //     .then(res=>res.json()).then(post=>dispatch({
        //         type: SAVE_RECIPE,
        //         payload: post
        //       }));
    };

    export const deleteRecipe=(recipeId)=>dispatch=>{
        
        console.log("deleteRecipe",recipeId);
        fetch(proxyUrl+baseUrl+recipeId,{
            method: 'delete'
          })
            .then(res=>res.json()).then(post=>dispatch({
                type: SAVE_RECIPE,
                payload: post
              }));
    };

    export const fetchCategories=(groupby,search)=>dispatch=>{
        console.log("fetchCategories")
        let params="";
        if(groupby!=null && search!=null)
            params="/?groupby="+groupby+"&search="+search;
        fetch(proxyUrl+baseUrl+"Categories"+params)
            .then(res=>res.json()).then(post=>dispatch({
                type: FETCH_CATEGORIES,
                payload: post
              }));
    };
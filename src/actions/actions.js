import {FETCH_RECIPIES,
    FETCH_RECIPE,SAVE_RECIPE,
    FETCH_CATEGORIES,
FETCH_SEARCH,
FETCH_MISC,
USER_LOGIN,
USER_LOGOUT,
CREATE_USER,
SET_FAVOURITE} from './types';


//let baseUrl = "https://vorobiovcompanyapi.azurewebsites.net/v1/Recipe/";
let baseUrl = "https://localhost:44320/v1/Recipe/";
let userUrl = "https://localhost:44320/v1/User/";
let proxyUrl = ""//"https://cors-anywhere.herokuapp.com/";
    export const fetchRecipies=()=>dispatch=>{
        console.log("fetchRecipies")
        
        fetch(proxyUrl+baseUrl)
            .then(res=>res.json()).then(post=>dispatch({
                type: FETCH_RECIPIES,
                payload: post
              }));
    };

    export const fetchRecipe=(recipeID)=>dispatch=>{
        if(Number.parseInt(recipeID)==0)
        return;
        console.log("fetchRecipe"+proxyUrl+baseUrl+recipeID)
        
        fetch(proxyUrl+baseUrl+recipeID)
            .then(res=>res.json()).then(
                post=>dispatch({
                type: FETCH_RECIPE,
                payload: post
              })
              );
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


    export const fetchMisc=()=>dispatch=>{
        console.log("fetchMisc");
        fetch(proxyUrl+baseUrl+"Misc")
            .then(res=>res.json()).then(post=>dispatch({
                type: FETCH_MISC,
                payload: post
              }));
    }

    export const fetchSearch=(searchWord)=>dispatch=>{
        console.log("fetchCategories")
        let params="";
        if(searchWord!=null)
            params="/?searchWord="+searchWord;
        fetch(proxyUrl+baseUrl+"Search"+params)
            .then(res=>res.json()).then(post=>dispatch({
                type: FETCH_SEARCH,
                payload: post
              }));
    };

    export const setFavourite=(recipeID,userID,isFavourite)=>dispatch=>{
      console.log("setFavourite")
      
      fetch(proxyUrl+baseUrl+"Favourite/"+isFavourite,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({"RecipeId":recipeID,"UserId":userID})
      })
          .then(post=>dispatch({
            type: SET_FAVOURITE,
            payload: post
          }));
  };
    
    // USER RELATED BEGIN
    export const userLogin=(loginObj)=>dispatch=>{
        console.log("userLogin")
        
        fetch(proxyUrl+userUrl+"login",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(loginObj)
          }).then(res=>res.json()).then(post=>dispatch({
                type: USER_LOGIN,
                payload: post
              }));
    };

    export const userLogout=(userID)=>dispatch=>{
      console.log("userLogin")
      
      fetch(proxyUrl+userUrl+"logout/"+userID).then(res=>res.json()).then(post=>dispatch({
              type: USER_LOGOUT,
              payload: post
            }));
  };

    export const createUser=(registerObj)=>dispatch=>{
        console.log("createUser")
        
        fetch(proxyUrl+userUrl+"create",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(registerObj)
          }).then(res=>res.json()).then(post=>dispatch({
                type: CREATE_USER,
                payload: post
              }));
    };
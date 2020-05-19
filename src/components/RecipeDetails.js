import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecipe,setFavourite } from '../actions/actions';
import Button from '@material-ui/core/Button';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
class RecipeDetails extends Component{
    
    constructor(){
        super();
        this.state={
            name : "",
            description : "",
            NumberOfServings : 0,
            Cuisine  : "",
            Categories : [],
            CookTime : 0,
            PrepTime : 0,
            tags : [],
            IngredientList : [],
            Instructions : [],
            Nutrition : [],
            Image : "",
            DietList : [],
        }
        this.onFavouriteClick = this.onFavouriteClick.bind(this)
    }
    componentWillMount() {
        
        if(this.props.match !=null && "oid" in this.props.match.params)
        {
            this.props.fetchRecipe([this.props.match.params.oid]);
            
        }
        
    }
    onFavouriteClick=e=>{
        if(window.sessionStorage.user!=null)
        {
            let user =JSON.parse(window.sessionStorage.user)
            this.props.setFavourite(this.state.id,user.id, this.state.isFavourite)
            if(this.state.isFavourite && user.favourite.indexOf(this.state.id)>-1)
                user.favourite.push(this.state.id)
            else
                user.favourite.splice(user.favourite.indexOf(this.state.id),1)
            
            sessionStorage.setItem("user", JSON.stringify(user))
        }
    }
    componentDidMount(){
        console.log(this.props)
        if(window.sessionStorage.user!=null){
            let user =JSON.parse(window.sessionStorage.user)
            if(user.favourite.indexOf(this.state.id))
            this.setState({isFavourite:true})
        }
    }
  
    render(){
        
        console.log(this.props)
        if(this.props.posts!=null && this.state.name==="")
            {
               
                // tags : [],
                
                
                // alergens 

                this.setState({
                    id:this.props.posts.id,
                    name : this.props.posts.name,
                    description : this.props.posts.description,
                    IngredientList : this.props.posts.IngredientList,
                    NumberOfServings : this.props.posts.NumberOfServings,
                    CookTime : this.props.posts.CookTime,
                    PrepTime: this.props.posts.PrepTime,
                    Instructions:this.props.posts.Instructions,
                    Categories : this.props.posts.Categories,
                    Cuisine:this.props.posts.Cuisine,
                    Nutrition : this.props.posts.Nutrition,
                    MealTypeList : this.props.posts.MealTypeList,
                    DietList : this.props.posts.DietList,
                    Image:this.props.posts.Image
                });
                
            }
        return (
            (this.props.posts==null)?
            <Loading />:
            <div className="recipeDetailsWrapper">
                
                    <div className="item-images">
                        <div className="favourite">
                            {(this.state.isFavourite)?
                                <FavoriteIcon onClick={e=>this.onFavouriteClick(e)}/>
                                :<FavoriteBorderIcon  onClick={e=>this.onFavouriteClick(e)}/>
                            }
                        </div>
                        <img src={this.state.Image} />
                    </div>
                    <div className="item-title">
                        <h1>{this.state.name}</h1>
                        
                        <Link className="edit-link" to={'/editRecipe/'+this.state.id} >
                            <EditIcon fontSize="small" />Edit
                        </Link>
                    </div>
                    <div className="item-description">{this.state.description}</div>

                    <div className="divider1">
                        <hr/>
                    </div>

                    <div className="item-serves">Servings: {this.state.NumberOfServings}</div>
                    <div className="item-cuisine">Cuisine: {this.state.Cuisine}</div>

                    <div className="divider3">
                        <hr/>
                    </div>

                    <div className="item-categories">
                        <div className="section-title">Categories:</div>
                        <div className="tagsPreviewArea">
                            {(this.state!=null && this.state.Categories!=null)?this.state.Categories.map((cat,index)=>
                                <div key={index} id={cat.Id} className="tagWrapper">{cat.Name}</div>):""}
                        </div>
                    </div>

                    <div className="item-alergens">
                        <div className="section-title">Diet: </div>
                        <div className="tagsPreviewArea">
                            {(this.state!=null && this.state.DietList!=null)?this.state.DietList.map((diet,index)=>
                                <div key={index} className="tagWrapper">{diet.Name}</div>):""}
                        </div>
                    </div>

                    <div className="item-cookingT">Cooks in: {this.state.CookTime} minutes</div>
                    <div className="item-preparationT">Preparation time: {this.state.PrepTime} minutes</div>

                    <div className="divider4">
                        
                    </div>

                    <div className="item-ingredients"><h3>Ingredients: </h3>
                            <ul className="stashedList">
                                {(this.state!=null && this.state.IngredientList!=null)?this.state.IngredientList.map((ingredient,index)=>
                                    <li key={index} className="tagWrapper">{ingredient.Quantity + "("+ingredient.Units+") x "+ingredient.Product  } </li>):""} 
                            </ul>
                            
                    </div>

                        
                    <div className="item-steps"><h3>Steps: </h3>
                        <ol className="stashedList">
                            {(this.state!=null && this.state.Instructions!=null)?this.state.Instructions.map((step,index)=>
                                <li key={index} className="tagWrapper">[{index+1}] {step.text} </li>):""}
                        </ol>
                           
                        
                    </div>

                    
                    <div className="item-nutrition"><h3>Nutrition: </h3>
                    <span style={{height:"20px",display: "block"}}></span>
                        {(this.state!=null && this.state.Nutrition!=null)?this.state.Nutrition.map((nutr,index)=>
                            <div key={index} className="tagWrapper">
                                <div>{nutr.Label+ " ["+nutr.Code+"] "+nutr.Value+" "+nutr.Unit} </div>
                            </div>):""}
                        
                    </div>

                    
               
            </div>
        );
    }
}

RecipeDetails.propTypes={
    posts: PropTypes.array.isRequired
}
const mapStateToProps = state=>({
    posts: state.posts.recipe
    
});
export default connect(mapStateToProps,{fetchRecipe,setFavourite})(RecipeDetails);
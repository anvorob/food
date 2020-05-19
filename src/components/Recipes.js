import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecipies,saveRecipe,fetchSearch } from '../actions/actions';
import RecipePreview from './RecipePreview';
import Loading from './Loading';

class Recipes extends Component{
    
    
listOfRecipes;
    constructor(){
        super();
    }
    componentDidMount() {
        console.log(this.props);
        this.props.fetchRecipies();
        //this.props.saveRecipe();
    }
    onSearchChange=e=>{
      
        this.props.fetchSearch(e.target.value)
      }
    render(){
        
            console.log(this.props);
            if(this.props.posts!=null)
                this.listOfRecipes =this.props.posts.map(recipe=><RecipePreview {...recipe}/>);
        return (
            (this.props.posts!=null)?
            <div className="recipesWrapper">
                {/* <input type="text" onChange={()=>fetchSearch}/> */}
                {this.listOfRecipes}
            </div>
            :
            <Loading />
        );
    }
}

// Recipes.propTypes={
//     posts: PropTypes.array.isRequired
// }
const mapStateToProps = state=>({
    posts: state.posts.recipes,
    srecipe:state.posts.srecipe
});
export default connect(mapStateToProps,{fetchRecipies,saveRecipe})(Recipes);
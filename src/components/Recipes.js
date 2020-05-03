import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecipies,saveRecipe } from '../actions/actions';
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
    
    render(){
        
            console.log(this.props);
            if(this.props.posts!=null)
                this.listOfRecipes =this.props.posts.map(recipe=><RecipePreview {...recipe}/>);
        return (
            (this.props.posts!=null)?
            <div className="recipesWrapper">
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
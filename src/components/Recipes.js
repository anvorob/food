import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecipies } from '../actions/actions';
import RecipePreview from './RecipePreview';

class Recipes extends Component{
    
    
listOfRecipes;
    constructor(){
        super();
    }
    componentDidMount() {
        console.log(this.props);
        this.props.fetchRecipies();
    }
    
    render(){
        
            console.log(this.props);
            if(this.props.posts!=null)
                this.listOfRecipes =this.props.posts.map(recipe=><RecipePreview {...recipe}/>);
        return (
            
            <div className="stockItemWrapper">
                {this.listOfRecipes}
            </div>
        );
    }
}

// Recipes.propTypes={
//     posts: PropTypes.array.isRequired
// }
const mapStateToProps = state=>({
    posts: state.posts.recipes
});
export default connect(mapStateToProps,{fetchRecipies})(Recipes);
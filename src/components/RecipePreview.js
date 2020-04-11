import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecipies } from '../actions/actions';
import { Link } from 'react-router-dom';

class RecipePreview extends Component{
    
    
listOfStockItems;
    constructor(){
        super();
    }
    componentDidMount() {
        console.log(this.props);
        
    }
    
    render(){
        
        
        return (
            
            <div className="recipePreview">
                <h2><Link to='/newRecipe/0' >{this.props.name}</Link></h2>
                <p>{this.props.description}</p>
                <div className="underline">
                    <div><i className="material-icons">access_time</i> <span>Cooking time:</span> {this.props.durations.cookTime} + {this.props.durations.prepTime} min</div>
                    <div><span>Number of servings:</span> {this.props.numberOfServings}</div>
                    <hr/>
                    Category: {this.props.labels.category.map(cat=><div className="categoryBox">{cat.displayName}</div>)}
                </div>
                
            </div>
        );
    }
}

RecipePreview.propTypes={
    posts: PropTypes.array.isRequired
}
const mapStateToProps = state=>({
    posts: state.posts.recipe
});
export default connect(mapStateToProps,{fetchRecipies})(RecipePreview);
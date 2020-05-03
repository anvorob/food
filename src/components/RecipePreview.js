import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecipies } from '../actions/actions';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';




class RecipePreview extends Component{
    
    
listOfStockItems;

    constructor(){
        super();
    }
    componentDidMount() {
        //console.log(this.props);
        
    }
    
    render(){

        return (
            
            // <div className="recipePreview">
            //     <h2><Link to={'/editRecipe/'+this.props.id} >{this.props.name}</Link></h2>
            //     <p>{this.props.description}</p>
            //     <div className="underline">
            //         <div><i className="material-icons">access_time</i> <span>Cooking time:</span> {this.props.CookTime} + {this.props.PrepTime} min</div>
            //         <div><span>Number of servings:</span> {this.props.NumberOfServings}</div>
            //         <hr/>
            //         Category: {this.props.Categories.map(cat=><div className="categoryBox">{cat.Name}</div>)}
            //     </div>
                
            // </div>

            <Card className="recipe-card" >
                <CardActionArea>
                    <CardMedia
                    style={{
                        height: 200
                      }}
                    image={
                        (this.props.Image!=undefined)?this.props.Image:
                        this.props.image
                    }
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        <Link to={'/viewRecipe/'+this.props.id} >
                            {this.props.name}
                        </Link>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.description.slice(0,100)}...
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    {(this.props.CookTime!=undefined)?
                        this.props.CookTime + this.props.PrepTime:
                        this.props.cookTime + this.props.prepTime} minutes
                    </Button>
                    
                </CardActions>
                </Card>

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
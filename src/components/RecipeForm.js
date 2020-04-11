import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecipe } from '../actions/actions';


class RecipeForm extends Component{
    
    constructor(){
        super();
        this.state={
            title : "",
            description : "",
            serves : 0,
            cuisisne  : "",
            categories : [],
            cookingT : 0,
            preparationT : 0,
            tags : [],
            ingredients : [],
            steps : [],
            nutrition : [],
            images : [],
            alergens : [],
        }
    }
    componentDidMount() {
        
        if(this.props.match !=null && "oid" in this.props.match.params)
        {
            this.props.fetchRecipe([this.props.match.params.oid]);
            
            
        }
    }
    onChange=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(this.state)
    }
    onEnter=e=>{
        let name=e.target.name
        let value = e.target.value
        if (e.key === 'Enter') {
            document.getElementsByName(name)[0].value="";
            let nameList=this.state[name];
            if(!this.state[name].includes(value))
            {
                nameList.push(value);
                this.setState((prevState) => ({
                    [name]:nameList
                }))
            }
        }
    }
    onSubmit=e=>{
        if (e.key === 'Enter') 
        return ;
        e.preventDefault();
        this.props.onSubmit(this.state);
    }
    deleteFromList(index,name){
        

        this.state[name].splice(index,1); 
        this.setState({
            [name]:this.state[name]
        })
            
    }


    render(){
        console.log(this.props)
        if(this.props.posts!=null)
        {
            
            
            // tags : [],
            
            // nutrition : [],
            // images : [],
            // alergens 

            this.state={
                title : this.props.posts.name,
                description : this.props.posts.description,
                ingredients : this.props.posts.ingredients.map(ingr=>ingr.text),
                serves : this.props.posts.numberOfServings,
                cookingT : this.props.posts.durations.cookTime,
                steps:this.props.posts.instructions.steps.map(step=>step.text),
                categories : this.props.posts.labels.category.map(cat=>cat.displayName),
                cuisisne:this.props.posts.labels.cuisine.map(cuise=>cuise.displayName)
            };
            
        }
        return (
            
            <div className="recipeWrapper">
                
                    <div className="item-title">Title: <input type="text" name="title" onChange={e=>this.onChange(e)} value={this.state.title}/></div>
                    <div className="item-description">Description: <textarea name="description" onChange={e=>this.onChange(e)} value={this.state.description}></textarea></div>
                    <div className="item-serves">Serves: <input type="number" name="serves" onChange={e=>this.onChange(e)} value={this.state.serves}/></div>
                    <div className="item-cuisine">Cuisine: <input type="text" name="cuisisne" onChange={e=>this.onChange(e)} value={this.state.cuisisne}/></div>


                    <div className="item-categories">Categories:<br/>
                        <div className="tagsArea">
                            {(this.state!=null && this.state.categories!=null)?this.state.categories.map((cat,index)=>
                                    <div className="tagWrapper">{cat} 
                                        <span className="tagDelete" onClick={()=>this.deleteFromList(index,"categories")}>
                                            <i className="material-icons tag-clear">clear</i>
                                        </span>
                                </div>):""}
                            <input type="text" className="transparent" name="categories" onKeyDown={this.onEnter}/>
                        </div>
                    </div>

                    <div className="item-cookingT">Cooks in: <input type="number" name="cookingT" onChange={e=>this.onChange(e)} value={this.state.cookingT}/></div>
                    <div className="item-preparationT">Preparation time: <input type="number" name="preparationT" onChange={e=>this.onChange(e)} value={this.state.preparationT}/></div>


                    <div className="item-tags">Tags: <br/>
                        <div className="tagsArea">
                            {(this.state!=null && this.state.tags!=null)?this.state.tags.map((tag,index)=>
                                <div className="tagWrapper">{tag} 
                                    <span className="tagDelete" onClick={()=>this.deleteFromList(index,"tags")}>
                                        <i className="material-icons tag-clear">clear</i>
                                    </span>
                                </div>):""}
                            <input type="text" className="transparent" name="tags" onKeyDown={this.onEnter}/>
                        </div>
                    </div>

                    
                    <div className="item-ingredients">Ingredients: 
                            <ul className="stashedList">
                                {(this.state!=null && this.state.ingredients!=null)?this.state.ingredients.map((ingredient,index)=>
                                    <li className="tagWrapper">{ingredient} 
                                        <span className="tagDelete" onClick={()=>this.deleteFromList(index,"ingredients")}>
                                            <i className="material-icons tag-clear">clear</i>
                                        </span>
                                    </li>):""}
                            </ul>
                            <br/>   
                        <input type="text" name="ingredients" onKeyDown={this.onEnter}/>
                    </div>

                        
                    <div className="item-steps">Steps: 
                        <ul className="stashedList">
                            {(this.state!=null && this.state.steps!=null)?this.state.steps.map((step,index)=>
                                <li className="tagWrapper">[{index+1}] {step} 
                                    <span className="tagDelete" onClick={()=>this.deleteFromList(index,"steps")}>
                                        <i className="material-icons tag-clear">clear</i>
                                    </span>
                                </li>):""}
                        </ul>
                            <br/>
                        <input type="text" name="steps" onKeyDown={this.onEnter}/>
                    </div>

                    
                    <div className="item-nutrition">Nutrition: 
                        {(this.state!=null && this.state.nutrition!=null)?this.state.nutrition.map((nutr,index)=>
                            <div className="tagWrapper">{nutr} 
                                <span className="tagDelete" onClick={()=>this.deleteFromList(index,"nutrition")}>
                                    <i className="material-icons tag-clear">clear</i>
                                </span>
                            </div>):""}
                        <input type="text" className="transparent" name="nutrition" onKeyDown={this.onEnter}/>
                    </div>

                    <div className="item-images">Image url: <input type="text" name="images" onChange={e=>this.onChange(e)}/></div>

                        
                    <div className="item-alergens">Alergens: <br/>
                        <div className="tagsArea">
                            {(this.state!=null && this.state.alergens!=null)?this.state.alergens.map((alergen,index)=>
                                <div className="tagWrapper">{alergen} 
                                    <span className="tagDelete" onClick={()=>this.deleteFromList(index,"alergens")}>
                                        <i className="material-icons tag-clear">clear</i>
                                    </span>
                                </div>):""}
                            <input type="text" className="transparent" name="alergens" onKeyDown={this.onEnter}/>
                        </div>
                    </div>
                    <div className="item-submit">
                        <span className="btn " onClick={e=>this.onSubmit(e)}>Submit</span>
                    </div>
                    
                
            </div>
        );
    }
}

RecipeForm.propTypes={
    posts: PropTypes.array.isRequired
}
const mapStateToProps = state=>({
    posts: state.posts.recipe
});
export default connect(mapStateToProps,{fetchRecipe})(RecipeForm);
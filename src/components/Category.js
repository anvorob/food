import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import RecipePreview from './RecipePreview';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/actions';
import Loading from './Loading';

class Category extends Component 
{
    groupby=""
    search="";
    constructor(){
        super();
        
    }
    componentWillMount() 
    {
        console.log(this.props);
        if(this.props.match.params!=null){
            let {groupby,search} = this.props.match.params;
            this.groupby=groupby;
            this.search=search;
            this.props.fetchCategories(groupby,search);   
        }
    }
    
    render(){
        let htmllist = "";
        if(this.props.posts!=null && this.props.match.params!=null){
            switch(this.props.match.params.groupby){
                case "category" : htmllist =this.props.posts.categoryList[this.props.match.params.search].map(recipe=><RecipePreview {...recipe}/>); break;
                case "cuisine" :htmllist =this.props.posts.cuisineList[this.props.match.params.search].map(recipe=><RecipePreview {...recipe}/>);  break;
                case "diet" : htmllist =this.props.posts.dietList[this.props.match.params.search].map(recipe=><RecipePreview {...recipe}/>); break;
            }
        }
           
        console.log(this.props);
        return (
            (this.props.posts!=null && this.props.match.params!=null)?
            <div className="Category">
               <h2 className="title">{this.groupby+" > "+this.search}</h2>
               <div className="RecipeList">
                   {htmllist}
               </div>
            </div>
            :<Loading />
        );
    }
}

const mapStateToProps = state=>({
    posts: state.posts.categories,
    
});
export default connect(mapStateToProps,{fetchCategories})(Category);
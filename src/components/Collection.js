import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategories } from '../actions/actions';
import Category from './Category';
import Loading from './Loading';

class Collection extends Component 
{
    constructor(){
        super();
        
    }
    componentWillMount() 
    {
        this.props.fetchCategories();   
    }
    
    render(){
        console.log(this.props.posts);
        let categoryList = [];
        let dietList=[];
        let cuisineList=[];
        if(this.props.posts==undefined){

        }else{
            // for(let [key, value] of Object.entries(this.props.posts.cuisineList)) 
            //     cuisineList.push(<Category title={key} recipeList={value} />);
            // for(let [key, value] of Object.entries(this.props.posts.dietList)) 
            //     dietList.push(<Category title={key} recipeList={value} />);
            // for(let [key, value] of Object.entries(this.props.posts.categoryList)) 
            //     categoryList.push(<Category title={key} recipeList={value} />);
            
            for(let [key, value] of Object.entries(this.props.posts.cuisineList)) 
            if(value.length>0)
                cuisineList.push(<div key={key} className="list-item">
                    <Link to={'/collection/cuisine/'+key}>
                        <img src={value[0].image} />
                        <h3>{key}</h3>
                    </Link>
                </div>);
            for(let [key, value] of Object.entries(this.props.posts.dietList)) 
            if(value.length>0)
                dietList.push(<div key={key} className="list-item">
                     <Link to={'/collection/diet/'+key}>
                        <img src={value[0].image} />
                        <h3>{key}</h3>
                    </Link>
                </div>);
            for(let [key, value] of Object.entries(this.props.posts.categoryList)) 
            if(value.length>0)
                categoryList.push(<div key={key} className="list-item">
                    <Link  to={'/collection/category/'+key}>
                        <img src={value[0].image} />
                        <h3>{key}</h3>
                    </Link>
                </div>);
        }
        return (
            (this.props.posts==undefined)?
            <Loading />
            :
            <div className="Collection">
                
                    <div className="collection-Item">
                        <h1>By Cuisines</h1>
                        {cuisineList}
                    </div>
                    <div className="collection-Item">
                        <h1>By Category</h1>
                        {categoryList}
                    </div>
                    <div className="collection-Item">
                        <h1>By Diet</h1>
                        {dietList}
                    </div>
            </div>
        );
    }
}


// Collection.propTypes={
//     posts: PropTypes.array.isRequired
// }
const mapStateToProps = state=>({
    posts: state.posts.categories,
    
});
export default connect(mapStateToProps,{fetchCategories})(Collection);
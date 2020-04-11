import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecipies } from '../actions/actions';


class TestComp extends Component{
    
    
listOfStockItems;
    constructor(){
        super();
    }
    componentDidMount() {
        console.log(this.props);
        this.props.fetchRecipies();
    }
    
    
    

    render(){
        
            console.log(this.props);
        
        
        return (
            
            <div className="stockItemWrapper">
                
            </div>
        );
    }
}

TestComp.propTypes={
    posts: PropTypes.array.isRequired
}
const mapStateToProps = state=>({
    posts: state.posts.items
});
export default connect(mapStateToProps,{fetchRecipies})(TestComp);
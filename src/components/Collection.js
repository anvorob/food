import React,{Component} from 'react';
import { Link } from 'react-router-dom';

import Recipes from './Recipes';
class Collection extends Component 
{
    constructor(){
        super();
        
    }
    componentWillMount(){
        
    }
    
    render(){
        
        return (
            <div className="Collection">
                <Recipes/>

            </div>
        );
    }
}

export default Collection;
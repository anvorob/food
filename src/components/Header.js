import React,{Component} from 'react';
import { Link } from 'react-router-dom';
//import '../Styles/Menu.css';
class Header extends Component 
{
    constructor(){
        super();
        
    }
    componentWillMount(){
        
    }
    
    render(){
        
        return (
            <div className="Header">
                <Link to='/' className="dropbtn">Home</Link>
                <Link to='/collection' className="dropbtn">Collection</Link>
                <Link to='/tips' className="dropbtn">Tips</Link>

            </div>
        );
    }
}

export default Header;
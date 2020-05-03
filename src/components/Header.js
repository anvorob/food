import React,{Component} from 'react';
import { Link } from 'react-router-dom';
//import '../Styles/Menu.css';
class Header extends Component 
{

    homeClass="menubtn";
    collectionClass= "menubtn";
    tipsClass="menubtn";
    constructor(){
        super();
        
    }
    componentWillMount(){
        
        if(this.props.activeLink !=null )
        {
            switch (this.props.activeLink.paths) {
                case "/collection":
                    this.collectionClass += " menubtn-active";
                    break;
                case "/tips":
                    this.tipsClass += " menubtn-active";
                        break;
                default:
                    break;
            }
                
        }
    }
    
    render(){
        
        return (
            <div className="Header">
                <div className="Header-links">
                    <Link to='/' className={this.homeClass}>Home</Link>
                    <Link to='/collection' className={this.collectionClass}>Collection</Link>
                    <Link to='/tips' className={this.tipsClass}>Tips</Link>
                </div>
                <div className="link-btn">
                    <Link to='/editRecipe/0' >Add recipe</Link>
                </div>
            </div>
        );
    }
}

export default Header;
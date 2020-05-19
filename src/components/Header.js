import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { userLogin,userLogout } from '../actions/actions';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import FaceIcon from '@material-ui/icons/Face';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
class Header extends Component 
{

    homeClass="menubtn";
    collectionClass= "menubtn";
    tipsClass="menubtn";
    
    constructor(){
        super();
        this.state={
            hideMenu : true,
            hideUserInfo:true,
            redirect: false,
            userCredentials:{}
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        this.Login = this.Login.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onUserInfoClick = this.onUserInfoClick.bind(this);
    }

    toggleMenu(){
        this.setState({hideMenu:!this.state.hideMenu});
    }
    Logout=e=>{
        e.preventDefault();
        window.sessionStorage.clear();
        this.props.userLogout(this.user.id);
        this.setState({
            redirect: true
          })
    }
    Login=e=>{
        if (e.key === 'Enter') 
        return ;
        e.preventDefault();
        this.props.userLogin(this.state.userCredentials);
    }
    onUserInfoClick=e=>{
        this.setState(prevState =>({hideUserInfo:!prevState .hideUserInfo}));
    }
    onLoginChange=e=>{
        let name=e.target.name
        let value = e.target.value
        this.state.userCredentials[name]=value;
    }

    
    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.userInfo !== prevState.userInfo && nextProps.userInfo!=null) {
            console.log('props changed. Return an object to change state');
            sessionStorage.setItem("user", JSON.stringify(nextProps.userInfo))
            return {
                userInfo: nextProps.value,
            }
          }
        console.log(prevState);
        console.log(nextProps);
    }
    componentDidMount(){
        
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
    
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }

    render(){
        
        if(sessionStorage.user!=null){
            this.user = JSON.parse(sessionStorage.getItem("user"));
            
        }
        
        return (
            <div className="Header">
                {(window.innerWidth<900)?
                <MenuIcon className="burger-btn" onClick={this.toggleMenu} />
                    :""
                }   
                {(!this.state.hideMenu || window.innerWidth>900)?
                <div>
                <div className="Header-links">
                    <Link to='/' className={this.homeClass}>Home</Link>
                    <Link to='/collection' className={this.collectionClass}>Collection</Link>
                    <Link to='/tips' className={this.tipsClass}>Tips</Link>
                </div>
                {
                        (this.user!=null)?
                        <div className="user-bar">
                            <ul>
                                <li>{(this.user.image!=null)?<img className="logo" src={this.user.image} /> :<FaceIcon />}</li>
                                <li>{this.user.name}</li>
                                <li>{(this.state.hideUserInfo)?<ExpandLessIcon  onClick={e=>this.onUserInfoClick(e)}/>:<ExpandMoreIcon  onClick={e=>this.onUserInfoClick(e)}/>}</li>
                            </ul>
                        </div>
                        :
                        <div className="user-bar">
                            <ul>
                                <li><FaceIcon /></li>
                                <li>User</li>
                                <li>{(this.state.hideUserInfo)?<ExpandLessIcon  onClick={e=>this.onUserInfoClick(e)}/>:<ExpandMoreIcon  onClick={e=>this.onUserInfoClick(e)}/>}</li>
                            </ul>
                        </div>
                }{
                    (this.state.hideUserInfo)?
                        (this.user!=null)?
                        <form className="user" onSubmit={this.Logout}>
                            <ul>
                                <li><Button type="submit">Logout</Button></li>
                                <li><Link to='/register' >Update info</Link></li>
                            </ul>
                        </form>
                        :
                        <form className="user" onSubmit={this.Login}>
                            <ul>
                                <li><span className="login-labels">Login:</span><input type="text" name="login" onChange={e=>this.onLoginChange(e)}/></li>
                                <li><span className="login-labels">Password:</span><input type="password" name="password" onChange={e=>this.onLoginChange(e)} /></li>
                                <li><Button type="submit">Login</Button><Link to='/register' >Register</Link></li>
                            </ul>
                        </form>
                    :null
                    }
                
                <div className="link-btn">
                    <Link to='/editRecipe/0' >Add recipe</Link>
                </div>
                </div>
                :""
                }
            </div>
        );
    }
}

const mapStateToProps = state=>({
    userInfo:state.posts.user
});
export default connect(mapStateToProps,{userLogin,userLogout})(Header);
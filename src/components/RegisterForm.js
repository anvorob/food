import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser } from '../actions/actions';
import Grid from '@material-ui/core/Grid';
import Loading from './Loading';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
  
class RegisterForm extends Component{
    

    constructor(){
        super();
        // if(sessionStorage.user!=null){
        //     this.user = JSON.parse(sessionStorage.getItem("user"));
        //     console.log("Converted")
        // }
        this.state={
            registerForm:(sessionStorage.user!=null)?JSON.parse(sessionStorage.user):{}
        }
        this.onRegister = this.onRegister.bind(this);
        this.onRegisterChange=this.onRegisterChange.bind(this);
    }
    componentDidMount() {
        
    }
    onRegister=e=>{
        e.preventDefault();
        console.log(this.state.registerForm)
        //this.props.createUser(this.state.registerForm);
    }

    onRegisterChange=e=>
    {
        let name=e.target.name
        let value = e.target.value
        this.state.registerForm[name]=value;
        
    }
    // const classes = useStyles();
    render(){
        
            
        return (
            // (this.props.posts!=null)?
            // <div className="recipesWrapper">
                
            // </div>
            // :
            // <Loading />
            <div className="registerFormWrapper">
                <form onSubmit={this.onRegister}>
                    <Grid container spacing={3}>
                        {/* <Grid item xs={12}>
                            <Paper >xs=12</Paper>
                        </Grid> */}
                        <Grid item xs={12} sm={6} className="label">
                            Name:
                        </Grid>
                        <Grid item xs={12} sm={6} className="field">
                            <input type="text" name="name" value={this.state.registerForm.name} onChange={e=>this.onRegisterChange(e)}/>
                        </Grid>
                        <Grid item xs={12} sm={6} className="label">
                            Login:
                        </Grid>
                        <Grid item xs={12} sm={6} className="field">
                            <input type="text" name="login" value={this.state.registerForm.login} onChange={e=>this.onRegisterChange(e)}/>
                        </Grid>
                        <Grid item xs={12} sm={6} className="label">
                            Password:
                        </Grid>
                        <Grid item xs={12} sm={6} className="field">
                            <input type="password" name="password" value={this.state.registerForm.password} onChange={e=>this.onRegisterChange(e)}/>
                        </Grid>
                        <Grid item xs={12} sm={6} className="label">
                            Password re-enter:
                        </Grid>
                        <Grid item xs={12} sm={6} className="field">
                            <input type="password" name="password-re" onChange={e=>this.onRegisterChange(e)}/>
                        </Grid>
                        <Grid item xs={12} sm={6} className="label">
                            Avatar:
                        </Grid>
                        <Grid item xs={12} sm={6} className="field">
                            <input type="string" name="Image" value={this.state.registerForm.image} onChange={e=>this.onRegisterChange(e)}/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button type="submit">Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

// Recipes.propTypes={
//     posts: PropTypes.array.isRequired
// }
const mapStateToProps = state=>({
    user:state.posts.user
});
export default connect(mapStateToProps,{createUser})(RegisterForm);
import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Collection from './components/Collection';
import Category from './components/Category';
import PageNotFound from './components/PageNotFound';
import Tips from './components/Tips';
import Recipes from './components/Recipes';
import RecipeForm from './components/RecipeForm';
import RegisterForm from './components/RegisterForm';
import RecipeDetails from './components/RecipeDetails';
import store from './store';
// import { userLogin } from './actions/actions';
import { Provider } from 'react-redux';


class App extends Component {
  constructor(){
    super();
    this.state={
        user:null
    }
    
}
  onSubmit=fields=>{
    console.log("Create ",fields);
  }
  // Login=fields=>{
  //   console.log(fields)  
  //   fetch("https://localhost:44320/v1/User/login",{
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({"login":fields.login,"password":fields.password})
  //   }).then(data=>{console.log(data)});
  // }
    
  onSubmit=fields=>{
    console.log("Update ",fields);
    fields.Instructions = JSON.stringify(fields.Instructions)
    fetch("https://localhost:44320/v1/Recipe/",{
          method: 'POST',
          
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(fields)
        }).then(data =>{ console.log(data);alert("Complete")});
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
    this.setState({ hasError: true });
  }

  render(){
    if (this.state.hasError) {
     //custom fallback UI
      return <div>Something went wrong.</div>;
    }
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Header activeUrl={this.props.match} user={this.state.user} />
          {/* <Recipes/> */}
          <Switch>
                {/* <Route exact path='/' component={Recipes}   /> */}
                <Route path='/collection/:groupby/:search'  component={Category} />
                <Route path='/collection' component={Collection} />
                <Route exact path='/recipes' component={Recipes}   />
                
                <Route path='/editRecipe/:oid'  render={(props)=><RecipeForm {...props} onSubmit={fields=>this.onSubmit(fields)} />} />

                <Route path='/viewRecipe/:oid'  render={(props)=><RecipeDetails {...props} />} />

                

                {/* <Route path='/tips' component={Tips}   /> */}
                <Route path='/register' component={RegisterForm}   />
                <Route path='/' component={Recipes}   />
                <Route path='*' exact={true} component={PageNotFound} />
          </Switch>
          <Footer/>
        </div>
      </Provider>
    </Router>
  );
}
}

export default App;

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
import RecipeDetails from './components/RecipeDetails';
import store from './store';
import { saveRecipe } from './actions/actions';
import { Provider } from 'react-redux';


class App extends Component {
  onSubmit=fields=>{
    console.log("Create ",fields);
  }

  onUpdate=fields=>{
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

  componentWillMount(){
    // if(this.props.match !=null && "path" in this.props.match)
    //     {
    //         switch (this.props.match.path) {
    //             case "/collection":
    //                 this.collectionClass += " menubtn-active";
    //                 break;
    //             case "/tips":
    //                 this.tipsClass += " menubtn-active";
    //                     break;
    //             default:
    //                 break;
    //         }   
    //     }
  }
  render(){
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Header activeUrl={this.props.match} />
          {/* <Recipes/> */}
          <Switch>
                {/* <Route exact path='/' component={Recipes}   /> */}
                <Route path='/collection/:groupby/:search'  component={Category} />
                <Route path='/collection' component={Collection} />
                <Route exact path='/recipes' component={Recipes}   />
                
                <Route path='/editRecipe/:oid'  render={(props)=><RecipeForm {...props} onSubmit={fields=>this.onUpdate(fields)} />} />

                <Route path='/viewRecipe/:oid'  render={(props)=><RecipeDetails {...props} onSubmit={fields=>this.onUpdate(fields)} />} />

                

                <Route path='/tips' component={Tips}   />
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

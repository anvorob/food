import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Collection from './components/Collection';
import Tips from './components/Tips';
import Recipes from './components/Recipes';
import RecipeForm from './components/RecipeForm';
import store from './store';
import { saveRecipe } from './actions/actions';
import { Provider } from 'react-redux';

class App extends Component {
  onSubmit=fields=>{
    console.log("Create ",fields);
  }

  onUpdate=fields=>{
    console.log("Update ",fields);
    saveRecipe(fields);
  }
  render(){
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Header/>
        {/* <Link to={{pathname: `/newRecipe/1`, query: '/rateDetails'}} >Next recipe</Link>
        <Link to={{pathname: `/recipe/1`, query: '/rateDetails'}} >Old recipe</Link> */}

          <Switch>
              {/* <Route exact path='/' component={Recipes}   /> */}
              <Route path='/collection' component={Collection} />
              <Route exact path='/recipes' component={Recipes}   />
              
              <Route path='/newRecipe/:oid'  render={(props)=><RecipeForm {...props} onSubmit={fields=>this.onUpdate(fields)} />} />
              <Route path='/tips' component={Tips}   />
              
             
              {/* <Router history={hashHistory} >
                <Route path="/" component={Body} />
                <Route path='/stocks/:type/:symbol/:page/:limit'  component={StockList} />
                <Route path='/stocks/:type/:symbol'  component={StockList} />
              </Router> */}
        </Switch>
        </div>
      </Provider>
    </Router>
  );
}
}
export default App;

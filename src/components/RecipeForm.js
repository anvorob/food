import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecipe,fetchMisc } from '../actions/actions';
import Button from '@material-ui/core/Button';
import Loading from './Loading';

class RecipeForm extends Component{
    
    constructor(){
        super();
        this.state={
            name : "",
            description : "",
            NumberOfServings : 0,
            Cuisine  : "",
            Categories : [],
            CookTime : 0,
            PrepTime : 0,
            tags : [],
            IngredientList : [],
            Instructions : [],
            Nutrition : [],
            Image : "",
            MealTypeList:[],
            DietList : [],
            Misc:[]
        }
        this.onNutritionChange = this.onNutritionChange.bind(this);
        this.onNutritionSave = this.onNutritionSave.bind(this);
        this.onIngredientChange = this.onIngredientChange.bind(this);
        this.onIngredientSave = this.onIngredientSave.bind(this);
        
    }
    componentWillMount() {
        this.props.fetchMisc();
        if(this.props.match !=null && "oid" in this.props.match.params)
        {
            this.props.fetchRecipe([this.props.match.params.oid]);
        }
        
    }

    componentDidMount(){
        console.log(this.props)
        
    }
    onChange=e=>{
        switch(e.target.type){
            case "number":  this.setState({[e.target.name] : parseFloat(e.target.value)}); break;
            case "textarea":
            case "text":    this.setState({[e.target.name] : e.target.value}); break;
            case "select-one":  if(e.target.value=="")
                                    break;
                                switch(e.target.name){
                                    case "MealTypeList": this.state[e.target.name]=[...this.state[e.target.name],...this.getMiscMatchingOption(this.state.misc.mealTypeList,e.target.value)];break;
                                    case "Categories": this.state[e.target.name]=[...this.state[e.target.name],...this.getMiscMatchingOption(this.state.misc.categoryList,e.target.value)]; break;
                                    case "DietList": this.state[e.target.name]=[...this.state[e.target.name],...this.getMiscMatchingOption(this.state.misc.dietList,e.target.value)]; break;
                                }
                                //this.state[e.target.name].push(e.target.value)
                                this.setState({[e.target.name] :this.state[e.target.name]}); break;
        }
        
        
    }

    getMiscMatchingOption(listOfObj,Id){
        return listOfObj.filter(obj=>obj.Id==Number.parseInt(Id));
    }
    onEnter=e=>{
        let name=e.target.name
        let value = e.target.value
        if (e.key === 'Enter') {
            document.getElementsByName(name)[0].value="";
            let nameList=this.state[name];
            if(!this.state[name].includes(value))
            {
                if(name==="Instructions")
                    nameList.push({"text":value});
                else
                    nameList.push({"Id":0,"Name":value});

                this.setState((prevState) => ({
                    [name]:nameList
                }))
            }
        }
    }
    onSubmit=e=>{
        if (e.key === 'Enter') 
        return ;
        e.preventDefault();
        this.props.onSubmit(this.state);
    }
    onNutritionClick(index,name){
        
        if(this.state.Nutrition!=null && this.state.Nutrition[index]!=null)
        {
            this.setState({
                nutritionForm:{
                    Id:this.state.Nutrition[index].Id,
                    Label:this.state.Nutrition[index].Label,
                    Code:this.state.Nutrition[index].Code,
                    Value:this.state.Nutrition[index].Value,
                    Unit:this.state.Nutrition[index].Unit
                }});
        }
        
        // this.state[name].splice(index,1); 
        // this.setState({
        //     [name]:this.state[name]
        // })
    }
    onNutritionChange(event){
        let toUpdate=event.target.name;
        this.setState({
            nutritionForm:{
                [toUpdate]:event.target.value
            }
        });
    }
    
    onNutritionSave(event){
        event.preventDefault();
        let LocalNutrition={};
        let stateNutrition=this.state.Nutrition;
        for(let element of event.target.elements)
        {
            switch(element.type){
                case "number":LocalNutrition[element.name] =parseFloat(element.value); break;
                case "text":LocalNutrition[element.name] =element.value; break;

            }
        }
        if(LocalNutrition.Id>0)
        {
            let searchObj = stateNutrition.find(item=>item.Id==LocalNutrition.Id);
            let index = stateNutrition.indexOf(searchObj);
            stateNutrition[index]=LocalNutrition;
        }
        else
        {
            stateNutrition.push(LocalNutrition)
        }
        this.setState({
            Nutrition:stateNutrition
        })
        this.setState({
            nutritionForm:{Id:0,
                Label:"",
                Code:"",
                Value:0,
                Unit:""
            }
        });
    }
    
    onIngredientChange(event){
        let toUpdate=event.target.name;
        this.setState({
            ingredientForm:{
                [toUpdate]:event.target.value
            }
        });
    }

    onIngredientSave(event)
    {
        event.preventDefault();
        let LocalIngredientList={};
        let stateIngredientList=this.state.IngredientList;
        for(let element of event.target.elements)
        {
            switch(element.type){
                case "number":LocalIngredientList[element.name] =parseFloat(element.value); break;
                case "text":LocalIngredientList[element.name] =element.value; break;
                case "select-one": LocalIngredientList[element.name] =element.value; break;
            }
        }
        if(LocalIngredientList.Id>0)
        {
            let searchObj = stateIngredientList.find(item=>item.Id==LocalIngredientList.Id);
            let index = stateIngredientList.indexOf(searchObj);
            stateIngredientList[index]=LocalIngredientList;
        }
        else
        {
            stateIngredientList.push(LocalIngredientList)
        }
        this.setState({
            IngredientList:stateIngredientList
        })
        this.setState({
            ingredientForm:{Id:0,
                Product:"",
                Quantity:0,
                Units:""
            }
        });
    }
    deleteFromList(index,name){
        this.state[name].splice(index,1); 
        this.setState({
            [name]:this.state[name]
        })
            
    }


    render(){
        
        console.log(this.props)
        // if(this.props.misc!=null)
        // {
        //     this.setState({});
        // }
        if(this.props.posts!=null && this.state.name==="")
            {
               
                // tags : [],
                
                
                // alergens 

                this.setState({
                    id:this.props.posts.id,
                    name : this.props.posts.name,
                    description : this.props.posts.description,
                    IngredientList : this.props.posts.IngredientList,
                    NumberOfServings : this.props.posts.NumberOfServings,
                    CookTime : this.props.posts.CookTime,
                    PrepTime: this.props.posts.PrepTime,
                    Instructions:this.props.posts.Instructions,
                    Categories : this.props.posts.Categories,
                    Cuisine:this.props.posts.Cuisine,
                    Nutrition : this.props.posts.Nutrition,
                    MealTypeList : this.props.posts.MealTypeList,
                    DietList : this.props.posts.DietList,
                    Image:this.props.posts.Image
                });
                
            }
            if(this.props.misc!=null && this.state.misc==null)
            {
                this.setState({
                    misc:this.props.misc
                })
            }
        return (
            (this.props.posts==null && false)?
            <Loading />:
            <div className="recipeWrapper">
                
                    <div className="item-title">Title: <input type="text" name="name" onChange={e=>this.onChange(e)} value={this.state.name}/></div>
                    <div className="item-description">Description: <textarea name="description" onChange={e=>this.onChange(e)} value={this.state.description}></textarea></div>
                    <div className="item-serves">Serves: <input type="number" name="NumberOfServings" min="1" onChange={e=>this.onChange(e)} value={this.state.NumberOfServings}/></div>
                    <div className="item-cuisine">Cuisine: <input type="text" name="Cuisine" onChange={e=>this.onChange(e)} value={this.state.Cuisine}/></div>


                    <div className="item-categories">
                        <div className="section-title">Categories:</div>
                        <div className="tagsArea">
                            {(this.state!=null && this.state.Categories!=null)?this.state.Categories.map((cat,index)=>
                                    <div key={index} id={cat.id} className="tagWrapper">{cat.Name} 
                                        <span className="tagDelete" onClick={()=>this.deleteFromList(index,"Categories")}>
                                            <i className="material-icons tag-clear">clear</i>
                                        </span>
                                </div>):""}
                            {/* <input type="text" className="transparent" name="Categories" onKeyDown={this.onEnter}/> */}
                            <select  className="transparent" name="Categories" onChange={e=>this.onChange(e)}>
                                <option>Select Options</option>
                                {
                                    (this.state.misc!=null)?
                                        this.state.misc.categoryList.map((cat,index)=>
                                            ( this.state.Categories.indexOf(cat.Name)<0)?
                                            <option value={cat.Id}>{cat.Name}</option>:null)
                                    :""}
                            </select>
                        </div>
                    </div>

                    <div className="item-cookingT">Cooks in: <input type="number" name="CookTime" min="1" onChange={e=>this.onChange(e)} value={this.state.CookTime}/></div>
                    <div className="item-preparationT">Preparation time: <input type="number" name="PrepTime" min="1" onChange={e=>this.onChange(e)} value={this.state.PrepTime}/></div>


                    <div className="item-tags">
                        <div className="section-title">Meal Type: </div>
                        <div className="tagsArea">
                            {(this.state!=null && this.state.MealTypeList!=null)?this.state.MealTypeList.map((MealType,index)=>
                                <div key={index} className="tagWrapper">{MealType.Name} 
                                    <span className="tagDelete" onClick={()=>this.deleteFromList(index,"MealTypeList")}>
                                        <i className="material-icons tag-clear">clear</i>
                                    </span>
                                </div>):""}
                            {/* <input type="text" className="transparent" name="tags" onKeyDown={this.onEnter}/> */}
                            <select  className="transparent" name="MealTypeList" onChange={e=>this.onChange(e)}>
                                <option>Select Options</option>
                                {
                                    (this.state.misc!=null)?
                                        this.state.misc.mealTypeList.map((cat,index)=>
                                            ( this.state.MealTypeList.indexOf(cat.Name)<0)?
                                            <option value={cat.Id}>{cat.Name}</option>:null)
                                    :""}
                            </select>
                        </div>
                    </div>

                    
                    <div className="item-ingredients">Ingredients: 
                    <br/>
                            <ul className="stashedList">
                                {(this.state!=null && this.state.IngredientList!=null)?this.state.IngredientList.map((ingredient,index)=>
                                    <li key={index} className="tagWrapper">{ingredient.Quantity + "("+ingredient.Units+") x "+ingredient.Product  } 
                                        <span className="tagDelete" onClick={()=>this.deleteFromList(index,"IngredientList")}>
                                            <i className="material-icons tag-clear">clear</i>
                                        </span>
                                    </li>):""}
                                    <li style={{display:"inline-flex"}}>
                                        {/* <input style={{width: "100%"}} type="text" name="IngredientList" onKeyDown={this.onEnter}/> */}
                                        <form className="nutrition-edit" onSubmit={this.onIngredientSave}>
                                            <table>
                                                <tr hidden>
                                                    <td >Id:</td><td><input id="nutrition-id" name="Id" type="number" value={this.state.ingredientForm?this.state.ingredientForm.Id:0}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Product:</td><td><input id="nutrition-label" name="Product" maxlength="30" type="text" value={this.state.ingredientForm?this.state.ingredientForm.Product:""} onChange={this.onIngredientChange}/></td>
                                                </tr>
                                               
                                                <tr>
                                                    <td colSpan="2"><span>Quantity:</span><input id="nutrition-value" name="Quantity" type="number"  value={this.state.ingredientForm?this.state.ingredientForm.Quantity:0} onChange={this.onIngredientChange}/>
                                                    <span style={{marginLeft:"7px",marginRight:"14px"}}>Units:</span>
                                                    <select id="nutrition-unit" style={{width: "70px",display: "inherit"}} name="Units" type="text" max="10"  value={this.state.ingredientForm?this.state.ingredientForm.Units:""} onChange={this.onNutritionChange} >
                                                        {(this.state.misc!=null)?
                                                        this.state.misc.units.map((unit)=><option value={unit}>{unit}</option>)
                                                        :null}
                                                    </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><Button type="submit">Save</Button></td><td><Button type="reset">Clear</Button></td>
                                                </tr>
                                            </table>
                                        </form>
                                    </li>
                            </ul>
                            
                    </div>

                        
                    <div className="item-steps">Steps: 
                        <ol className="stashedList">
                            {(this.state!=null && this.state.Instructions!=null)?this.state.Instructions.map((step,index)=>
                                <li key={index} className="tagWrapper">[{index+1}] {step.text} 
                                    <span className="tagDelete" onClick={()=>this.deleteFromList(index,"Instructions")}>
                                        <i className="material-icons tag-clear">clear</i>
                                    </span>
                                </li>):""}
                                <li style={{display:"inline-flex",width: "100%"}}><input style={{width: "100%"}} type="text" name="Instructions" onKeyDown={this.onEnter}/></li>
                        </ol>
                           
                        
                    </div>

                    
                    <div className="item-nutrition">Nutrition: 
                    <br/>
                    <span style={{height:"20px",display: "block"}}></span>
                        {(this.state!=null && this.state.Nutrition!=null)?this.state.Nutrition.map((nutr,index)=>
                            <div key={index} className="tagWrapper">
                                <div onClick={()=>this.onNutritionClick(index,"nutrition")}>{nutr.Label+ " ["+((nutr.Code!="")?nutr.Code:" - ")+"] "+nutr.Value+" "+nutr.Unit} </div>
                                <span className="tagDelete" onClick={()=>this.deleteFromList(index,"Nutrition")}>
                                    <i className="material-icons tag-clear">clear</i>
                                </span>
                            </div>):""}
                        {/* <input type="text" className="transparent" name="Nutrition" onKeyDown={this.onEnter}/> */}
                        <form className="nutrition-edit" onSubmit={this.onNutritionSave}>
                            <table>
                                <tr hidden>
                                    <td >Id:</td><td><input id="nutrition-id" name="Id" type="number" value={this.state.nutritionForm?this.state.nutritionForm.Id:0}/></td>
                                </tr>
                                <tr>
                                    <td>Label:</td><td><input id="nutrition-label" name="Label" type="text" value={this.state.nutritionForm?this.state.nutritionForm.Label:""} onChange={this.onNutritionChange}/></td>
                                </tr>
                                <tr>
                                    <td>Code:</td><td><input id="nutrition-code" name="Code" type="text" value={this.state.nutritionForm?this.state.nutritionForm.Code:""}  onChange={this.onNutritionChange}/></td>
                                </tr>
                                <tr>
                                    <td colSpan="2"><span style={{marginRight:"14px"}}>Value:</span><input id="nutrition-value" name="Value" type="number"  value={this.state.nutritionForm?this.state.nutritionForm.Value:0} onChange={this.onNutritionChange}/>
                                    <span style={{marginLeft:"7px",marginRight:"14px"}}>Unit:</span><input id="nutrition-unit" style={{width: "70px"}} name="Unit" type="text" max="10"  value={this.state.nutritionForm?this.state.nutritionForm.Unit:""} onChange={this.onNutritionChange} /></td>
                                </tr>
                                <tr>
                                    <td><Button type="submit">Save</Button></td><td><Button type="reset">Clear</Button></td>
                                </tr>
                            </table>
                        </form>
                    </div>

                    <div className="item-images">
                        {(this.state.Image!=="")?
                        <img src={this.state.Image} />
                        :""
                        }
                        <div className="image-url">
                            Image url: <input type="text" name="Image" value={this.state.Image} onChange={e=>this.onChange(e)}/>
                        </div>
                    </div>

                        
                    <div className="item-alergens">
                        <div className="section-title">Diet: </div>
                        <div className="tagsArea">
                            {(this.state!=null && this.state.DietList!=null)?this.state.DietList.map((alergen,index)=>
                                <div key={index} className="tagWrapper">{alergen.Name} 
                                    <span className="tagDelete" onClick={()=>this.deleteFromList(index,"DietList")}>
                                        <i className="material-icons tag-clear">clear</i>
                                    </span>
                                </div>):""}
                            {/* <input type="text" className="transparent" name="DietList" onKeyDown={this.onEnter}/> */}
                            <select  className="transparent" name="DietList" onChange={e=>this.onChange(e)}>
                                <option>Select Options</option>
                                {
                                    (this.state.misc!=null)?
                                        this.state.misc.dietList.map((cat,index)=>
                                            ( this.state.DietList.indexOf(cat.Name)<0)?
                                            <option value={cat.Id}>{cat.Name}</option>:null)
                                    :""}
                            </select>
                        </div>
                    </div>
                    <div className="item-submit">
                        <span className="btn " onClick={e=>this.onSubmit(e)}>Submit</span>
                    </div>
                    
                
            </div>
        );
    }
}

RecipeForm.propTypes={
    posts: PropTypes.array.isRequired
}
const mapStateToProps = state=>({
    posts: state.posts.recipe,
    misc:state.posts.misc
    // title : (state.posts.recipe)? state.posts.recipe.name:"",
    // description : (state.posts.recipe)? state.posts.recipe.description:"",
    // ingredients : (state.posts.recipe)? state.posts.recipe.IngredientList:"",
    // serves : (state.posts.recipe)? state.posts.recipe.NumberOfServings:"",
    // cookingT : (state.posts.recipe)? state.posts.recipe.CookTime:"",
    // preparationT:(state.posts.recipe)?  state.posts.recipe.PrepTime:"",
    // steps:(state.posts.recipe)? JSON.parse( state.posts.recipe.Instructions).map(step=>step.text):"",
    // categories : (state.posts.recipe)? state.posts.recipe.Categories.map(cat=>cat.Name):"",
    // cuisisne:(state.posts.recipe)? state.posts.recipe.Cuisine:"",
    // nutrition :(state.posts.recipe)?  state.posts.recipe.Nutrition:"",
    // tags :(state.posts.recipe)?  state.posts.recipe.MealTypeList:"",
    // diets :(state.posts.recipe)?  state.posts.recipe.DietList:"",
        
    
});
export default connect(mapStateToProps,{fetchRecipe,fetchMisc})(RecipeForm);
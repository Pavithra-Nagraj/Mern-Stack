import React ,{useState , useEffect} from 'react';
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom';
import { getCategories , createProduct} from './helper/adminapicall';
import { isAutheticated } from '../auth/helper';



const AddProduct = ()=> {
  
  const [values , setValues] = useState({
    name : "",
    description:"",
    price : "",
    stock : "",
    categories : [],
    photo : "",
    category: "",
    loading: false,
    error:"",
    didaRedirect : false,
    createdProduct: "",
    formData: ""

  });


  const { name ,description,price,stock,categories,category,
   photo,loading,error,didaRedirect,createdProduct,formData} = values;

   const {user , token} = isAutheticated();
  
  const preload =() =>{
    getCategories().then(data=>{
      console.log(data)
      if(data.error){
        setValues({...values, error : error.data})
      }else{
        setValues({...values , categories : data , formData : new FormData()})
        console.log(categories)
      }
    })
  }

  useEffect(() => {
   preload()
  }, [])


    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({...values , error:"" , loading:true})
        createProduct(user._id, token ,formData)
        .then(data =>{
          if(data.error){
            setValues({...values, error : data.error})
          }else{
            setValues({...values,
            name : "",
            description : "",
            price :"",
            photo:"",
            stock:"",
            loading:false,
            createdProduct:data.name
        })
          }
        })
        .catch()
    }

    const successmessage =() =>(
      <div className="alert alert-success mt-3"
       style ={{display : createdProduct ? "" : "none" }}>
       <h1>{createdProduct} created successfully</h1></div>
    )

    const errorMessage =() =>{
      return(
        <div className="alert alert-danger mt-3"
        style={{display : error ? "" : "none"}}>
        <h1> Failed to create</h1>
        </div>
      )
    }

    const performRedirect = () => {
      if(didaRedirect){
      return  <Redirect to="/admin/dashboard" />  
      }
    }

    const loadingmessage = () => {
     return (
       loading && (
         <div className ="alert alert-info">
         <h1> ...loading</h1></div>
       )
     )

    }

    const handleChange = name => event =>{
       const value = name === 'photo' ? event.target.files[0] : event.target.value
       formData.set(name , value);
       setValues({...values ,[name] : value})
    }

    const createProductForm =() =>(
        <form>
          <span>Post photo</span>
          <div className="form-group">
          <label className="btn btn-block btn-success">
           <input type="file"
           name="photo"
           accept="photo"
           placeholder="choose a file"
           onChange ={handleChange("photo")} />
          </label></div>
         
           <div className="form-group">
           <input 
           className="form-control"
           placeholder="Name"
           onChange ={handleChange("name")}
           value={name} />
           </div>

           <div className="form-group">
           <textarea name="photo"
           className="form-control"
           placeholder="description"
           onChange={handleChange("description")}
           value={description} />
           </div>

           <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>

      <div className="form-group">
      <select className="forn-control"
      placeholder="category"
      onChange={handleChange("category")}>
       <option>Select</option>
       {categories && 
        categories.map((cate , index) =>(
          <option key={index} value={cate._id}>{cate.name}</option>
        ))}
      </select>
      </div>

      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button type="submit" onClick={onSubmit} className="btn btn-outline-success">Create Product </button>

        </form>
    )

 

    return (
        <Base title="Add a product" description="product creation"
         className="container bg-info p-4">
         <h2 className="text-white"> Add a product</h2>
         <Link to="/admin/dashboard" className="btn btn-md bg-dark pb-3 text-white">Admin dashboard</Link>
          <div className="row text-white bd-dark rounded">
          <div className="col-md-8 offset-md-2">
          {successmessage()}
          {errorMessage()}
          {loadingmessage()}
          {performRedirect()}
          {createProductForm()}
          </div>
          </div>
         </Base>
    )
}
export default AddProduct;

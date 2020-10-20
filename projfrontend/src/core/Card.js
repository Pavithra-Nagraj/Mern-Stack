import React ,{useState ,useEffect} from 'react'
import ImageHelper from './helper/ImageHelper';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import { Redirect } from 'react-router-dom';


const Card = ({
    product ,addtoCart =true , removeFromCart =  false ,
reload= undefined,
setReload =  f => f
//function(f) {return f} 
}) => {
 
 const [redirect, setRedirect] = useState(false)
 const [count , setCount] = useState(product.count)


    const cardTitle = product ? product.name: "A photo from rexel";
    const cardDescription = product ? product.description: "tshirts for good price";
    const cardPrice = product ? product.price: "Default";

const addToCart =()=>{
    addItemToCart(product, () =>{setRedirect(true)})
}


const getARedirect = (redirect) =>{
    if(redirect){
        return <Redirect to="/cart" />
    }
}

 const showAddToCart = addToCart =>{
     return(
         addtoCart && (
            <button
            onClick={addToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
         )
      )
 }

 const showRemoveFromCart = removeFromCart =>{
   return(
       removeFromCart && (
        <button
        onClick={() => {removeItemFromCart(product._id);
      setReload(!reload)}}
        className="btn btn-block btn-outline-danger mt-2 mb-2"
      >
        Remove from cart
      </button>
       )
   )
}

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
        {getARedirect(redirect)}
          <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
           {cardDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">{cardPrice}</p>
          <div className="row">
            <div className="col-12">
             {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };
export default Card;

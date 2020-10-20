import React,{useState ,useEffect} from 'react';
import '../styles.css';
import {API} from "../backend"
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cartHelper';




const Cart= () => {

    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    
 
    const loadAllProducts =(products) =>{
        return(
            <div>
            <h1>This section is for purchase</h1>
            {products.map((product,index)=>(
                <Card key={index}
                removeFromCart = {true}
                addtoCart={false} 
                product={product}
                reload ={reload}
                setReload ={setReload} />
            ))}
            </div>
        )
    }

    useEffect(() => {
       setProducts(loadCart)
    }, [reload])

    
    const loadCheckout =() =>{
        return(
            <h1>This section is for check out</h1>
        )
    }
    
    

    return (
       <Base title="Cart page">
        <div className= "row">
        <div className="col-6">
        {loadAllProducts()}
        </div>
       
        </div>
            
       </Base>
    )
}
export default Cart;

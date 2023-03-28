import { request, response } from "express";
import session from "express-session";
import OrderItems from "../model/order-item.mode.js";
import OrderDetails from "../model/order.model.js";
import Cart from "../model/cart.model.js";
import Product from "../model/product.model.js";
import Category from "../model/category.model.js";

export const save = (request,response,next)=>{
  let cartItems = JSON.parse(request.body.cartItems);
  let totalBillAmount = cartItems.reduce((previous,current)=>{
    return previous + current.price * current.qty;
  },0);
  const {contactPerson, contactNumber, delieveryAddress} = request.body;
  let date = new Date().toString().substring(4,15).replaceAll(' ','-');
  let userId = request.session.user.id;
  let paymentMode = "COD";
  let orderId = Date.now();
  let order = new OrderDetails(orderId,userId,date,totalBillAmount,contactPerson,contactNumber,delieveryAddress,"Received","COD");
  order.save()
  .then(result=>{
    OrderItems.save(cartItems,orderId)
     .then(result=>{
       Cart.clearCart(userId)
        .then(result=>{
           OrderDetails.getOrderByUserId(userId)
            .then(result=>{
              Category.getList()
              .then(result2=>{
                return response.render("order-history.ejs",{
                  currentUser: request.session.user,
                  historyItem:result,
                  categoryList:result2
                });
              })
              .catch();
              
            })
            .catch(err=>{
                console.log(err);
            })
        })
        .catch(err=>{
          console.log(err);
        })
     }).catch(err=>{
        console.log(err);
     });    
  })
  .catch();
}


export const view = (request,response,next)=>{
  let userId = request.session.user.id;
  Category.getList()
    .then(results => {
      OrderDetails.getOrderByUserId(userId)
      .then(result=>{
        return response.render("order-history.ejs",{
          categoryList: results,
          currentUser: request.session.user,
          message: '',
          historyItem:result
        })
      })
      .catch()
      
    })
    .catch(err => {
      console.log(err);
    });
}
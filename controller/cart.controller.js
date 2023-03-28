import { request, response } from "express";
import Cart from "../model/cart.model.js";
import OrderDetails from "../model/cart.model.js";
import Category from "../model/category.model.js";
import Product from "../model/product.model.js";
export const addToCart = (request, response, next) => {

    let userId = request.params.userId * 1 - 1543;
    let productId = request.params.productId * 1 - 2567;
    console.log((userId +" "+ productId));
    let cart = new Cart();
    cart.userId = userId;
    cart.productId = productId;

    cart.isProductExists()
        .then(result => {
            if (!result.length) {
                cart.save()
                    .then(result => {
                        return response.json({ message: "Added Successfull" });
                    });
            }
            else
                return response.json({ message: "Already Exists " });
        })
        .catch(err => console.log(err));
}

export const viewCart = (request, response, next) => {
    if (request.session.user) {
        let userId = request.session.user.id;
        Cart.getCartItem(userId)
            .then(result => {
                Category.getList()
                    .then(results => {
                        return response.render("view-cart.ejs", {
                            currentUser: request.session.user,
                            cartItems: JSON.parse(JSON.stringify(result)),
                            categoryList: results
                        })
                    })
                    .catch()
            })
            .catch(err => console.log(err));
    }
    else {
        Category.getList()
        .then(result=>{
            return response.render("/",{
                categoryList : result
            })
        })
        .catch()
    }
}
export const loadCart = (request, response, next) => {
    let userId = request.session.user.id;
    Cart.getCartItem(userId)
        .then(result => {
            return response.status(200).json(result);
        })
        .catch(err => console.log(err));
}

export const remove = (request, response, next) => {
    let id = request.params.id;
    let userId = request.session.user.id;
    OrderDetails.remove(id, userId)
        .then(result => {
            return response.redirect("");
        })
        .catch(err => {
            console.log(err);
        })
}

export const viewItems = (request,response,next)=>{
    let itemid = request.params.itemid;

    Cart.viewItems(itemid)
    .then(resultt=>{
        Category.getList()
        .then(resul=>{
            Product.getList()
            .then(results=>{
                return response.render("history-items.ejs",{
                    categoryList:resul,
                    currentUser : request.session.user,
                    productList:results,
                    purchaseItem:resultt,
                    personName:request.params.personName
                })
            })
            .catch()
        })
        .catch(err)
    })
    .catch(err=>{
        console.log(err);
    })
}
import { request, response } from "express";
import Category from "../model/category.model.js";
import Product from "../model/product.model.js";

export const search = (request,response,next)=>{
    console.log("controller me aa gaya");
    Product.getProductByKeyword(request.params.keyword)
    .then(result=>{
        return response.status(200).json({
            productList:result,
            currentUser:request.session.user
        });
    })
    .catch(err=>{
        console.log(err);
    })
}
export const allProduct = (request,response,next)=>{
    Promise.all([Product.getList(),Category.getList()])
    .then(results=>{
        return response.render("product.ejs",{
            productList: results[0],
            categoryList: results[1],
            currentUser: request.session.user,
            message: 'All Products Here......',
        })
    })
    .catch();
}
export const productByCategory = (request,response,next)=>{
    let categoryName = request.params.categoryName;
    Promise.all([Product.getProductByCategory(categoryName),Category.getList()])
    .then(results=>{
        return response.render("product.ejs",{
            productList: results[0],
            categoryList: results[1],
            currentUser: request.session.user,
            message: ""+categoryName+""

          })
    })
    .catch();
}
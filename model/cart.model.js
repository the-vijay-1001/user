import pool from './dbConfig.js';

export default class Cart{
    constructor(id,userId,productId){
        this.id = id;
        this.userId = userId;
        this.productId = productId;
    }
    save(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "insert into cart(userId,productId) values(?,?)";
                    con.query(sql,[this.userId,this.productId],(err,result)=>{
                        err ? reject(err): resolve(result);
                        con.release();
                    })
                }
                else{
                    reject(err);
                }
            })
        })
    }
    isProductExists(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "select * from cart where userId = ? and productId = ?";
                    con.query(sql,[this.userId,this.productId],(err,result)=>{
                        err?reject(err):resolve(result);
                        con.release();
                    })
                }
                else{
                    reject(err);
                }
            })
        })
    }

    static getCartItem(userId){
        return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
            if(!err){
              let sql = "select product.id,product.title,product.price,product.discountPercentage,product.stock,product.brand,product.thumbnail from product inner join cart on product.id = cart.productId where cart.userId = ?";
              con.query(sql,[userId],(err,result)=>{
                con.release();
                err ? reject(err) : resolve(result);
              })
            }
            else
             reject(err);
          })       
        })
      }
      static clearCart(userId){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "delete from cart where userId = ?";
                    con.query(sql,[userId],(err,result)=>{
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                }
                else{
                    reject(err);
                }
            })
        })
      }
      static remove(productId, userId){
        return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
            if(!err){
              let sql = "delete from cart where productId=? and userId=?";
              con.query(sql,[productId,userId],(err,result)=>{
                err ? reject(err) : resolve(result);
                con.release();
              })
            }
            else
             reject(err);
          })
        });
      }
      static viewItems(itemid){
        return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
            if(!err){
              let sql = "select * from product inner join order_items on order_items.productId = product.id where  order_items.orderDetailsId = ?";
              con.query(sql,[itemid],(err,result)=>{
                err ? reject(err) : resolve(result);
                con.release();
              })
            }
            else{
              reject(err);
            }
          })
        })
      }
}
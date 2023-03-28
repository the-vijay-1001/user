import pool from './dbConfig.js';
export default class OrderItems{
    constructor(id, productId,qty,orderDetailsId){
        this.id = id;
        this.productId = productId;
        this.qty = qty;
        this.orderDetailsId = orderDetailsId;
    }

    static save(cartItems,orderId){
      return new Promise((resolve,reject)=>{
         pool.getConnection((err,con)=>{
            if(!err){
               let sql = "insert into order_items(orderDetailsId,productId,quantity) values(?,?,?)";
               cartItems.forEach(item=>{
                   con.query(sql,[orderId,item.id,item.qty],(err,result)=>{
                      if(err)
                        reject(err);
                        else{
                            resolve(result);
                        }
                   })
               });
               
            }
            else
             reject(err);
         })
      });
    }
}
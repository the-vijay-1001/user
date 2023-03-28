import { request } from "express";
import pool from "./dbConfig.js";
export default class OrderDetails{
    constructor(id, userId, date, billAmount, contactPerson, contactNumber, delieveryAddress,status, paymentMode){
        this.id = id;
        this.userId = userId;
        this.date = date;
        this.billAmount = billAmount;
        this.contactPerson = contactPerson;
        this.contactNumber = contactNumber;
        this.paymentMode = paymentMode;
        this.delieveryAddress = delieveryAddress;
        this.status = status;
    }

    save(){
        return new Promise((resolve,reject)=>{
           pool.getConnection((err,con)=>{
              if(!err){
                let sql = "insert into order_details(id,userId,date,billAmount,contactPerson,contactNumber,delieveryAddress,status,paymentMode) values(?,?,?,?,?,?,?,?,?)";
                con.query(sql,[this.id,this.userId, this.date,this.billAmount,this.contactPerson,this.contactNumber,this.delieveryAddress,this.status,this.paymentMode],(err,result)=>{
                    con.release();
                    err ? reject(err) : resolve(result);
                })
              }
              else
                reject(err);
           });
        });
    }
    static remove(id,userId){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "delete from cart where id = ? and userId = ?";
                    con.query(sql,[id,userId],(err,result)=>{
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
    static getOrderByUserId(userId){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "select * from order_details where userId = ?";
                    con.query(sql,[userId],(err,result)=>{
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                }
                else{
                    reject(err)
                }
            })
        })
    }
}
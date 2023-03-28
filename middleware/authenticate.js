import Category from "../model/category.model.js";
export const verify = (request,response,next)=>{
    if(request.session.user)
      next();
    else{
      Category.getList()
      .then(result=>{
        return response.render("signin.ejs",{
          currentUser:"",
          categoryList : result
        });
      })
      .catch(err=>{
        console.log(err)
      })
    }
}
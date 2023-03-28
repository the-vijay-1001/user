import  Sequelize  from "sequelize";
console.log(Sequelize);

export default sequelize = new Sequelize('shoesmall','root','vijay%2000',{
    dialect:'mysql',
    host:'localhost'
});

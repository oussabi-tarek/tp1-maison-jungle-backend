const dbConfig= require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize =new  Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
   host: dbConfig.HOST,
   dialect: dbConfig.dialect,
   define:{
         timestamps:false,
         freezeTableName:true
   }
})

const Plant = sequelize.define('plant', {
    name: {
        type: Sequelize.STRING
    },
     category:{
        type: Sequelize.STRING
    },
    light:{
        type: Sequelize.INTEGER
    },
    water:{
        type: Sequelize.INTEGER
    },
    price:{
        type: Sequelize.FLOAT
    },
    cover:{
        type:Sequelize.BLOB
    }
})

module.exports=Plant;


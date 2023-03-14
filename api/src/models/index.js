//inicio sequelize y relaciones

const {Sequelize} = require('sequelize')
const {dbUser, dbName, dbPassword, dbHost} = require('../utils/config')
const Categorys = require('./Category')
const Customers = require('./Customer')
const Products = require('./Product')
const Providers = require('./Provider')
const Purchases = require('./Purchase')
const Sales = require('./Sale')
const Users = require('./User')
const Moves = require('./Move')

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`);

const Category = Categorys(sequelize)
const Customer = Customers(sequelize)
const Product = Products(sequelize)
const Provider = Providers(sequelize)
const Purchase = Purchases(sequelize)
const Sale = Sales(sequelize)
const User = Users(sequelize)
const Move = Moves(sequelize)

//Relaciones
Sale.belongsToMany(Product, { through: "Product_Sale" });
Product.belongsToMany(Sale, { through: "Product_Sale" }); // se genera tabla intermedia

Purchase.belongsToMany(Product, { through: "Product_Purchase" });
Product.belongsToMany(Purchase, { through: "Product_Purchase" }); // se genera tabla intermedia

Provider.belongsToMany(Product, { through: "Product_Provider" });
Product.belongsToMany(Provider, { through: "Product_Provider" }); // se genera tabla intermedia

Customer.hasMany(Sale)
Sale.belongsTo (Customer) // coloca customerId en sale

Provider.hasMany(Purchase)
Purchase.belongsTo (Provider) // coloca providerId en purchase

Category.hasMany(Product)
Product.belongsTo (Category) // coloca categoryId en product

Sale.hasMany(Move)
Move.belongsTo (Provider) // coloca providerId en Move

Product.hasMany(Move)
Move.belongsTo (Product) // coloca productId en Move

Purchase.hasMany(Move)
Move.belongsTo (Customer) // coloca customerId en Move

module.exports = {
    conn: sequelize,
    Category,
    Customer,
    Product,
    Provider,
    Purchase,
    Sale,
    User,
    Move
}
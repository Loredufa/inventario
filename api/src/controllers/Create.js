const { Provider } = require('../models/index')
const { Product } = require('../models/index')

const addProduct = async (req, res) => {
    try{
    const {codigo_producto, codigo_barras, nombre, descripcion, cantidad, precio_compra, precio, descuento, iva, 
        precio_venta, categoryId, providerId}= req.body
    let newProduct = await Product.create ({
        codigo_producto,
        codigo_barras,
        nombre,
        descripcion,
        cantidad,
        precio_compra,
        precio,
        descuento,
        iva,
        precio_venta,
        categoryId
    })
    let providerdb = await Provider.findAll(
        {
            where: {
             id:providerId 
            }
         })
    newProduct.addProvider(providerdb)
    res.send(newProduct)
    } catch {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


module.exports = { addProduct}
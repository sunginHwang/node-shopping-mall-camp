const models = require('../../models');


exports.getProducts = async (req, res) => {
    try{
        const product = await models.Products.findByPk(req.params.id);
        res.render('products/detail.html', { product });
    }catch(e){
        console.log(e);
    }
}

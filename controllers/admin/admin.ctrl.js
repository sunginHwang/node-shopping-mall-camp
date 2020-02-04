const models = require('../../models');
const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, prettyPrint} = format;
const paginate = require('express-paginate');

const logger = createLogger({
    format: combine(
        label({label: 'admin!'}),
        timestamp(),
        prettyPrint()
    ),
    transports: [new transports.Console()]
})


exports.index = async (req, res) => {
    res.send('admin app');
}

exports.getProducts = async (req, res) => {
    try {

        const [products, totalCount] = await Promise.all([

            models.Products.findAll({
                include: [
                    {
                        model: models.User,
                        as: 'Owner',
                        attributes: ['username', 'displayname']
                    },
                ],
                limit: req.query.limit,
                offset: req.offset
            }),

            models.Products.count()
        ]);

        const pageCount = Math.ceil(totalCount / req.query.limit);

        const pages = paginate.getArrayPages(req)(4, pageCount, req.query.page);

        res.render('admin/products.html', {products, pages, pageCount});

    } catch (e) {

    }
}

exports.getProduct = async (req, res) => {
    try {
        const product = await models.Products.findOne({
            where: {
                id: req.params.id
            },
            include: [
                'Memo'
            ]
        });
        res.render('admin/detail.html', {product});
    } catch (e) {
        logger.log({level: 'error', message: e});
    }
}

exports.getEditProduct = async (req, res) => {
    const product = await models.Products.findByPk(req.params.id);
    res.render('admin/form.html', {product, csrfToken: req.csrfToken()});
}

exports.editProduct = async (req, res) => {
    try {
        const product = await models.Products.findByPk(req.params.id);
        // create + as에 적은 내용 ( Products.js association 에서 적은 내용 )
        await product.createMemo(req.body)
        res.redirect('/admin/products/detail/' + req.params.id);

    } catch (e) {
        logger.log({level: 'error', message: e});
    }
}

exports.updateProduct = async (req, res) => {
    try {
        // 이전에 저장되어있는 파일명을 받아오기 위함
        const product = await models.Products.findByPk(req.params.id);

        // 파일요청이면 파일명을 담고 아니면 이전 DB에서 가져온다
        req.body.thumbnail = (req.file) ? req.file.filename : product.thumbnail;

        await models.Products.update(
            req.body,
            {
                where: {id: req.params.id}
            }
        );
        res.redirect('/admin/products/detail/' + req.params.id);

    } catch (e) {
        logger.log({level: 'error', message: e});
    }
}

exports.removeProduct = async (req, res) => {
    const {id} = req.params;
    await models.Products.destroy({
        where: {
            id
        }
    });
    res.redirect('/admin/products');
}

exports.getWriteProduct = async (req, res) => {
    res.render('admin/form.html', {csrfToken: req.csrfToken()});
}

exports.writeProduct = async (req, res) => {
    try {
        req.body.thumbnail = (req.file) ? req.file.filename : "";
        // 유저를 가져온다음에 저장
        const user = await models.User.findByPk(req.user.id);
        await user.createProduct(req.body)
        res.redirect('/admin/products');
    } catch (e) {
        logger.log({level: 'error', message: e});
    }
}

exports.getProductMemo = async (req, res) => {
    try {

        await models.ProductsMemo.destroy({
            where: {
                id: req.params.memo_id
            }
        });
        res.redirect('/admin/products/detail/' + req.params.product_id);

    } catch (e) {
        logger.log({level: 'error', message: e});
    }
}

exports.createImage = async (req, res) => {
    res.send('/uploads/' + req.file.filename);
}

exports.get_order = async(req,res) => {

    try{

        const checkouts = await models.Checkout.findAll();
        res.render( 'admin/order.html' , { checkouts });

    }catch(e){

    }
}

exports.get_order_edit = async(req,res) => {
    try{

        const checkout = await models.Checkout.findByPk(req.params.id);
        res.render( 'admin/order_edit.html' , { checkout });

    }catch(e){

    }
}
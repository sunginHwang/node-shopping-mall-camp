const models = require('../../models');


exports.getContacts = async (req, res) => {
    models.Contacts.findAll({}).then(contacts => {
        res.render('contacts/contacts.html', {contacts});
    });
}

exports.getContact = async (req, res) => {
    try {
        const contact = await models.Contacts.findOne({
            where: {
                id: req.params.id
            },
            include: [
                'Memo'
            ]
        });
        res.render('contacts/detail.html', {contact});
    } catch (e) {
        console.log(e);
    }
}

exports.goWriteContactPage = async (req, res) => {
    try {
        const contact = await models.Contacts.findByPk(req.params.id);
        // create + as에 적은 내용 ( Products.js association 에서 적은 내용 )
        await contact.createMemo(req.body)
        res.redirect('/contacts/detail/' + req.params.id);

    } catch (e) {
        console.log(e)
    }
}

exports.goEditContactPage =  (req, res) => {
    models.Contacts.findByPk(req.params.id).then(contact => {
        res.render('contacts/form.html', {contact});
    });
}

exports.modifyContact = async (req, res) => {
    const {name, price, description} = req.body;
    const {id} = req.params;
    models.Contacts.update({name, price, description}, {where: {id}}
    ).then(() => {
        res.redirect(`/contacts/detail/${id}`);
    });
}

exports.removeContact = async (req, res) => {
    const {id} = req.params;
    models.Contacts.destroy({
        where: {
            id
        }
    }).then(() => {
        res.redirect('/contacts');
    });
}

exports.goWritePage = (req, res) => {
    res.render('contacts/form.html');
};

exports.createContact = (req, res) => {
    const {name, price, description} = req.body;
    models.Contacts.create({name, price, description}).then(() => {
        res.redirect('/contacts');
    });
};

exports.removeContactMemo = async (req, res) => {

    try {
        await models.ContactsMemo.destroy({
            where: {
                id: req.params.memo_id
            }
        });
        res.redirect('/contacts/detail/' + req.params.contact_id);

    } catch (e) {
        console.log(e);
    }

};



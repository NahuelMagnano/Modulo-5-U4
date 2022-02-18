var express = require('express');
var router = express.Router();
var noticiasModel = require('../../models/noticiasModel');

router.get('/', async function (req, res, next) {

    var noticias = await noticiasModel.getNoticias();

    res.render('admin/noticias', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        noticias
    });
});


router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    })
});


router.post('/agregar', async (req, res, next) => {

    console.log(req.body)
    try {
        if (req.body.titulo != "" && req.body.cuerpo != "") {
            await noticiasModel.insertNoticia(req.body)
            res.redirect('/admin/noticias')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true, 
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true, 
            message: 'No se cargo la novedad'
        });
    }
});


module.exports = router;
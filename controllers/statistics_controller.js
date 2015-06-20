var models = require('../models/models.js');
var preguntasConComentarioSQL = 'SELECT count(DISTINCT(`QuizId`)) AS `count` FROM `Comments` AS `Comment`;';

exports.index = function(req, res, next){
    var estadisticas = new Array();

    models.Quiz.count().then(function(nPreguntas){
        estadisticas.push({
                            texto:  'Número de preguntas',
                            numero: nPreguntas});

        return models.Comment.count();
    })

    .then(function(count){
        estadisticas.push({
                            texto:  'Número de comentarios',
                            numero: count});
        estadisticas.push({
                            texto:  'Número medio de comentarios por pregunta',
                            numero: count/estadisticas[0].numero});

        return models.queries.query(preguntasConComentarioSQL, {type: models.queries.QueryTypes.SELECT});
    })

    .then(function(count){
        estadisticas.push({
                            texto:  'Número de preguntas sin comentarios',
                            numero: estadisticas[0].numero - count[0].count});
        estadisticas.push({
                            texto:  'Número de preguntas con comentarios',
                            numero: count[0].count});
    })

    .then(function(){
        res.render('statistics/index', {estadisticas: estadisticas, errors: []});
    }).catch(function(error){ next(error);});
};

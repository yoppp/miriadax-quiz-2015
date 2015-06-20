var path = require('path');

var Sequelize = require('sequelize');

var sequelize = new Sequelize(null, null, null,
                              {dialect: "sqlite", storage: "quiz.sqlite"}
                    );

var Quiz    = sequelize.import(path.join(__dirname, 'quiz'));
var Comment = sequelize.import(path.join(__dirname, 'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment,{
    'constraints': true,
    'onDelete':'cascade',
    'onUpdate':'cascade',
    'hooks': true
}); 

exports.Quiz    = Quiz;
exports.Comment = Comment;

sequelize.sync().then(function(){
    Quiz.count().then(function(count){
        if(count === 0){
            Quiz.create({
                            pregunta:   '¿Capital de Italia?',
                            respuesta:  'Roma',
                            tema:       'Humanidades'
                        });
            Quiz.create({
                            pregunta:   '¿Capital de Portugal?',
                            respuesta:  'Lisboa',
                            tema:       'Humanidades'
                        })
            .then(function(){
                console.log('Base de datos inicializada.');
            });
        };
    });
});

exports.queries = sequelize;

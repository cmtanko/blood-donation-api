var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function () {
    nodemon({
        script: 'app.js', //entry scrip
        ext: 'js', //extension type
        env: {
            PORT: 8000 //application port
        },
        ignore: ['./node_modules']
    })
    .on('restart', function () {
        console.log('Restarting');
    })
});
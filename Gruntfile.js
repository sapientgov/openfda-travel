module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
        clean: {
            dist: ['dist/js', 'dist/*.html', 'dist/img/', 'dist/css']
        },

        copy : {
            js : {
                src : ['js/**/*js'],
                dest: 'dist/js'
            },
            html : {
                src : ['*.html'],
                dest : 'dist/'              
            },
            css: {
                src : ['css/**/*.css'],
                dest : 'dist/css' 
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'css'
                }
            }
        },

		browserify: {
            web: {
                dest: 'dist/js/app.js',
                src: ['js/main.js'],
                options: {
                    watch: true
                }
            }
        },
        
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['compass']
            }
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    base: 'dist'
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-connect');

    grunt.registerTask('default',['watch']);
}

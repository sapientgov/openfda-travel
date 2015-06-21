module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
        clean: {
            dist: ['dist']
        },

        copy : {
            js_client : {
                cwd: 'src/',
                src : ['js/client/**/*.js', 'js/libs/**/*.js'],
                dest: 'dist/',
                expand: true
            },
            html : {
                cwd: 'src/',
                src : ['*.html'],
                dest : 'dist/',
                expand: true
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'dist/css',
                    environment: 'production'
                }
            },
			dev: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'dist/css'
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
            sass: {
                files: ['src/sass/**/*.scss', 'src/css/**/*.css'],
                tasks: ['compass:dev']
            },
            html: {
                files: 'src/**/*.html',
                tasks: ['copy:html']
            },
            js_client: {
                files: 'src/js/client/**/*.js',
                tasks: ['copy:js_client']
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
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('bootstrap-sass');

    grunt.registerTask('build-prod', ['clean', 'copy', 'compass:dist']);
    grunt.registerTask('build-dev', ['clean', 'copy', 'compass:dev']);
    grunt.registerTask('default',['build-prod']);
    grunt.registerTask('dev', ['build-dev', 'connect:server', 'watch']);
    grunt.registerTask('jenkins',['']);
}

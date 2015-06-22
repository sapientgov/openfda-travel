module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
        clean: {
            dist: ['dist']
        },

        copy : {
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
                dest: 'dist/js/client/app.js',
                src: ['src/js/client/main.js'],
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
            js_test: {
                files: ['test/js/**/*.js', 'src/js/client/**/*.js'],
                tasks: ['karma:dev:run']
            }
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    base: 'dist'
                }
            }
        },
        
        karma: {
            dev: {
                configFile: 'karma.conf.js',
                singleRun: false,
                background: true,
                port: 9877
            },
            ci: {
                configFile: 'karma.conf.js',
                singleRun: true
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
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('build-prod', ['clean', 'copy', 'compass:dist', 'browserify:web']);
    grunt.registerTask('build-dev', ['clean', 'copy', 'compass:dev', 'browserify:web']);
    grunt.registerTask('default',['build-prod']);
    grunt.registerTask('dev', ['build-dev', 'karma:dev:start', 'connect:server', 'watch']);
    grunt.registerTask('jenkins',['build-prod', 'karma:ci']);

}

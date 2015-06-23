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
                src : ['*.html', 'fonts/*', 'img/*'],
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
        
        jshint: {
            scripts: {
                src : [ 'src/js/**/*.js', '!src/js/client/libs/**/*.js'],
                options: {
                    laxbreak : true,
				    smarttabs : true,
                    browserify: true,
                    browser: true,
                    devel: true,
                    strict: true,
                    globals: {
                        google: false
                    }
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
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint']
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
                singleRun: true,
                port: 32000
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('bootstrap-sass');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('build-prod', ['clean', 'copy', 'compass:dist', 'browserify']);
    grunt.registerTask('build-dev', ['clean', 'copy', 'compass:dev', 'browserify']);
    grunt.registerTask('default',['build-prod']);
    grunt.registerTask('dev', ['build-dev', 'jshint', 'karma:dev:start', 'connect:server', 'watch']);
    grunt.registerTask('jenkins',['build-prod', 'jshint', 'karma:ci']);

}

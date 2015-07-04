module.exports = function(grunt) {
    
    //if this is in the openshift environment look up the correct port to use
    var ci_port = process.env.OPENSHIFT_NODEJS_PORT || 32000;
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
        clean: {
            dist: ['dist']
        },

        copy : {
            html : {
                cwd: 'src/',
                src : ['*.html','*.ico', 'fonts/**/*', 'img/**/*'],
                dest : 'dist/public',
                expand: true
            },
            server_js: {
                cwd: 'src/js/server/',
                src: ['**/*.js'],
                dest: 'dist/server',
                expand: true
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'dist/public/css',
                    environment: 'production'
                }
            },
			dev: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'dist/public/css'
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
                        google: false,
                        Digits: false
                    }
                }
            }
        },

		browserify: {
            web: {
                dest: 'dist/public/js/app.js',
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
            js_client: {
                files: ['test/js/client/**/*.js', 'src/js/client/**/*.js'],
                tasks: ['karma:dev:run']
            },
            js_server: {
                files: ['test/js/server/**/*.js', 'src/js/server/**/*.js'],
                tasks: ['mochaTest']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint']
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
                port: ci_port
            }
        },
        
        express: {
            dev: {
                options: {
                    script: 'dist/server/app.js'
                }
            }
        },
        
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                },
                src: ['test/js/server/**/*.js']
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('bootstrap-sass');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('build-prod', ['clean', 'copy', 'compass:dist', 'browserify']);
    grunt.registerTask('build-dev', ['clean', 'copy', 'compass:dev', 'browserify']);
    grunt.registerTask('default',['build-prod']);
    grunt.registerTask('dev', ['build-dev', 'jshint', 'karma:dev:start', 'mochaTest', 'express:dev', 'watch']);
    grunt.registerTask('ci',['build-prod', 'jshint', 'karma:ci', 'mocha']);

}

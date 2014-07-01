/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',

        clean: ["pkg/"],

        env : {
            options : {
                /* Shared Options Hash */
                //globalOption : 'foo'  
            },
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            pre : {
                NODE_ENV : 'PREPRODUCTION'   
            },
            prod : {
                NODE_ENV : 'PRODUCTION'   
            }
        },

        bump: {
            options: {
                commit: false,
                createTag: false,
                push: false
            }
        },

        copy: {
            package: {
                src: 'package.json',
                dest: 'pkg/',
            },
            server0: {
                src: '.printer',
                dest: 'pkg/',
            },
            server1: {
                src: 'app.js',
                dest: 'pkg/',
            },
            server4: {
                src: 'public/**/*',
                dest: 'pkg/',
            },
            server5: {
                src: 'views/**/*',
                dest: 'pkg/',
            }
        },

        'sftp-deploy': {
            prod: {
                auth: {
                    host: '91.121.177.78',
                    port: 22,
                    authKey: 'prod'
                },
                src: 'pkg',
                dest: '/home/Showtimes-prod/Showtimes',
                server_sep: '/'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sftp-deploy');

    grunt.registerTask('prod', ['env:prod', 'clean', 'bump', 'copy', 'sftp-deploy:prod']);
};
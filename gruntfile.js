module.exports = function(grunt) {
    grunt.initConfig({

        // ------------------------------------------------
        // sass compile - possible settings
        // DOCS: https://github.com/gruntjs/grunt-contrib-sass
        // ------------------------------------------------

        sass: {
            //src: {
            dist: {
                files: {
                    'src/public/stylesheets/pages/error.css': 'src/sass/pages/error.sass',
                    'src/public/stylesheets/pages/main.css': 'src/sass/pages/main.sass',
                    'src/public/stylesheets/pages/about-me.css': 'src/sass/pages/about-me.sass',
                    'src/public/stylesheets/pages/work.css': 'src/sass/pages/work.sass',
                    'src/public/stylesheets/pages/contact.css': 'src/sass/pages/contact.sass',
                    // project subpages
                    'src/public/stylesheets/pages/projects/pgp-bird.css': 'src/sass/pages/projects/pgp-bird.sass'
                }
            }
        },


        // ------------------------------------------------
        // grunt-autoprefixer - possible settings
        // DOCS: https://github.com/nDmitry/grunt-autoprefixer
        // ------------------------------------------------

        autoprefixer: {
            src: {
                files: {
                    // load mainpages
                    'src/public/stylesheets/pages/error.css': 'src/public/stylesheets/pages/error.css',
                    'src/public/stylesheets/pages/main.css': 'src/public/stylesheets/pages/main.css',
                    'src/public/stylesheets/pages/about-me.css': 'src/public/stylesheets/pages/about-me.css',
                    'src/public/stylesheets/pages/work.css': 'src/public/stylesheets/pages/work.css',
                    'src/public/stylesheets/pages/contact.css': 'src/public/stylesheets/pages/contact.css',
                    // project subpages
                    'src/public/stylesheets/pages/projects/pgp-bird.css': 'src/public/stylesheets/pages/projects/pgp-bird.css'
                }
            }            
        },


        // ------------------------------------------------
        // cssmin - possible settings
        // DOCS: https://github.com/gruntjs/grunt-contrib-cssmin
        // ------------------------------------------------

        cssmin: {
            options: {
                shorthandCompacting: true,
                roundingPrecision: -1,
                choices: 'gzip'
            },
            target: {
                files: [{
                    'dist/public/stylesheets/cssmin/error.min.css': [
                        'src/public/resources/purecss/pure.min.css',
                        'src/public/resources/purecss/purecss-modules/grids-responsive-min.css',
                        'src/public/stylesheets/pages/error.css'
                    ],
                    'dist/public/stylesheets/cssmin/main.min.css': [
                        'src/public/resources/purecss/pure.min.css',
                        'src/public/resources/purecss/purecss-modules/grids-responsive-min.css',
                        'src/public/stylesheets/pages/main.css'
                    ],
                    'dist/public/stylesheets/cssmin/about-me.min.css': [
                        'src/public/resources/purecss/pure.min.css',
                        'src/public/resources/purecss/purecss-modules/grids-responsive-min.css',
                        'src/public/resources/aos/aos.css',
                        'src/public/stylesheets/pages/about-me.css'
                    ],
                    'dist/public/stylesheets/cssmin/work.min.css': [
                        'src/public/resources/purecss/pure.min.css',
                        'src/public/resources/purecss/purecss-modules/grids-responsive-min.css',
                        'src/public/resources/aos/aos.css',
                        'src/public/stylesheets/pages/work.css'
                    ],
                    'dist/public/stylesheets/cssmin/contact.min.css': [
                        'src/public/resources/purecss/pure.min.css',
                        'src/public/resources/purecss/purecss-modules/grids-responsive-min.css',
                        'src/public/stylesheets/pages/contact.css'
                    ],
                    'dist/public/stylesheets/cssmin/projects/pgp-bird.min.css': [
                        'src/public/resources/purecss/pure.min.css',
                        'src/public/resources/purecss/purecss-modules/grids-responsive-min.css',
                        'src/public/resources/aos/aos.css',
                        'src/public/resources/swiper/css/swiper.min.css',
                        'src/public/stylesheets/pages/projects/pgp-bird.css'
                    ]
                }]
            }
        },


        // ------------------------------------------------
        // JsHint - possible settings
        // DOCS: https://github.com/gruntjs/grunt-contrib-jshint
        // ------------------------------------------------

        jshint: {
            files: [
                'gruntfile.js',
                // components
                'src/public/javascripts/common/animation-handler.js',
                'src/public/javascripts/common/viewportsize.js',
                'src/public/javascripts/common/menu.js',
                'src/public/javascripts/common/modal.js',
                'src/public/javascripts/common/scrollup.js',
                'src/public/javascripts/common/detail-nav.js',
                // 'src/public/javascripts/common/fade-out-header.js',
                'src/public/javascripts/common/store-fonts.js',
                'src/public/javascripts/common/phone-slider.js',
                // pages
                'src/public/javascripts/pages/error.js',
                'src/public/javascripts/pages/main.js',
                'src/public/javascripts/pages/about-me.js',
                'src/public/javascripts/pages/work.js',
                'src/public/javascripts/pages/contact.js',
                // project subpages
                'src/public/javascripts/pages/projects/pgp-bird.js'
            ],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        // ------------------------------------------------
        // file watcher - (doing all the stuff) possible settings
        // DOCS: https://github.com/gruntjs/grunt-contrib-watch
        // ------------------------------------------------

        watch: {
          options: {
            livereload: true,
            spawn: false
          },
          // watch the pug files
          html: {
            files: ['src/views/**/*.pug'],
            tasks: []
          },
          // watch the js files
          js: {
            files: ['src/public/javascripts/**/*.js'],
            tasks: ['jshint']
          },
          // watch the sass files, but don't load everything if only sass changes
          sass: {
            options: {
              livereload: false
            },
            files: ['src/sass/**/*.sass'],
            tasks: ['sass']
          },
          css: {
            files: ['src/public/stylesheets/**/*.css'],
            tasks: ['autoprefixer:src']
          }
        },





        // DEPLOY RELATED TASKS


        // ------------------------------------------------
        // grunt-images - possible settings
        // DOCS: https://github.com/gruntjs/grunt-contrib-imagemin
        // ------------------------------------------------

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/public/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/public/images/'
                }]
            }
        },


        // // ------------------------------------------------
        // // uglifyJS - possible settings
        // // DOCS: https://github.com/gruntjs/grunt-contrib-uglify
        // // ------------------------------------------------

        uglify: {
            options: {
                // a.) Specify mangle: false to prevent changes to your variable and function names.
                //mangle: false,
                // b.) Reserved identifiers: You can specify identifiers to leave 
                // untouched with an except array in the mangle options.
                mangle: {
                 except: ['jQuery']
                },
                // c.) Turn off console warnings
                compress: {
                    drop_console: true
                }
            },
            target: {
                files: [
                    { 'dist/public/javascripts/uglify/common/store-fonts.min.js': 
                        [ 
                            'src/public/javascripts/common/store-fonts.js'
                        ] 
                    },{ 'dist/public/javascripts/uglify/common/basic-components.min.js': 
                        [ 
                            'src/public/javascripts/common/menu.js',
                            'src/public/javascripts/common/scrollup.js',
                            'src/public/javascripts/common/modal.js'  
                        ] 
                    },{ 'dist/public/javascripts/uglify/pages/main.min.js': 
                        [ 
                            'src/public/javascripts/common/animation-handler.js',
                            'src/public/javascripts/pages/main.js'
                        ]
                    },{ 'dist/public/javascripts/uglify/pages/error.min.js': 
                        [ 
                            'src/public/javascripts/common/animation-handler.js',
                            'src/public/javascripts/pages/error.js'
                        ] 
                    },{ 'dist/public/javascripts/uglify/pages/about-me.min.js': 
                        [ 
                            'src/public/javascripts/common/detail-nav.js',
                            'src/public/javascripts/pages/about-me.js' 
                        ] 
                    },{ 'dist/public/javascripts/uglify/pages/work.min.js': 
                        [ 
                            'src/public/javascripts/pages/work.js'
                        ] 
                    },{ 'dist/public/javascripts/uglify/pages/contact.min.js': 
                        [ 
                            'src/public/javascripts/common/animation-handler.js',
                            'src/public/javascripts/pages/contact.js'
                        ] 
                    },{ 'dist/public/javascripts/uglify/pages/projects/pgp-bird.min.js': 
                        [ 
                            'src/public/javascripts/pages/projects/pgp-bird.js'
                        ] 
                    },{ 'dist/public/javascripts/uglify/common/project-components.min.js': 
                        [ 
                            'src/public/javascripts/common/phone-slider.js'
                        ] 
                    }
                ]
            }
        },



        // // ------------------------------------------------
        // // concat - possible settings
        // // DOCS: https://github.com/gruntjs/grunt-contrib-concat
        // // ------------------------------------------------

        concat: {
            options: {
                seperator: ';'//,
                // stripBanners: true,
                // banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },

            // TOP LEVEL PAGES
            error: {
                src: [ 
                    'src/public/resources/jquery/jquery-2.2.4.min.js',
                    'src/public/resources/jquery/jquery.mobile-1.4.5.touch-events.min.js',
                    'dist/public/javascripts/uglify/common/basic-components.min.js',                
                    'dist/public/javascripts/uglify/pages/error.min.js'
                ],
                dest: 'dist/public/javascripts/concat/pages/error.min.js'
            },
            main: {
                src: [ 
                    'src/public/resources/jquery/jquery-2.2.4.min.js',
                    'src/public/resources/jquery/jquery.mobile-1.4.5.touch-events.min.js',
                    'dist/public/javascripts/uglify/common/basic-components.min.js',                
                    'dist/public/javascripts/uglify/pages/main.min.js'
                ],
                dest: 'dist/public/javascripts/concat/pages/main.min.js'
            },
            aboutMe: {
                src: [ 
                    'src/public/resources/jquery/jquery-2.2.4.min.js',
                    'src/public/resources/jquery/jquery.mobile-1.4.5.touch-events.min.js',                 
                    'src/public/resources/aos/aos.js',
                    'dist/public/javascripts/uglify/common/basic-components.min.js',
                    'dist/public/javascripts/uglify/pages/about-me.min.js' 
                ],
                dest: 'dist/public/javascripts/concat/pages/about-me.min.js'
            },
            work: {
                src: [
                    'src/public/resources/jquery/jquery-2.2.4.min.js',
                    'src/public/resources/jquery/jquery.mobile-1.4.5.touch-events.min.js',                 
                    'src/public/resources/aos/aos.js',
                    'dist/public/javascripts/uglify/common/basic-components.min.js',
                    'dist/public/javascripts/uglify/pages/work.min.js'
                ],
                dest: 'dist/public/javascripts/concat/pages/work.min.js'
            },
            contact: {
                src: [
                    'src/public/resources/jquery/jquery-2.2.4.min.js',
                    'src/public/resources/jquery/jquery.mobile-1.4.5.touch-events.min.js',
                    'dist/public/javascripts/uglify/common/basic-components.min.js',
                    'dist/public/javascripts/uglify/pages/contact.min.js'
                ],
                dest: 'dist/public/javascripts/concat/pages/contact.min.js'
            },

            // PROJECTS
            pgpBird: {
                src: [
                    'src/public/resources/jquery/jquery-2.2.4.min.js',
                    'src/public/resources/jquery/jquery.mobile-1.4.5.touch-events.min.js',                 
                    'src/public/resources/aos/aos.js',
                    'src/public/resources/swiper/js/swiper.jquery.min.js',
                    'dist/public/javascripts/uglify/common/basic-components.min.js',
                    'dist/public/javascripts/uglify/common/project-components.min.js', 
                    'dist/public/javascripts/uglify/pages/projects/pgp-bird.min.js'
                ],
                dest: 'dist/public/javascripts/concat/pages/projects/pgp-bird.min.js'
            }
        }




    });


    // run watcher tasks
    grunt.loadNpmTasks('grunt-contrib-watch');

    // grunt task for minifying images 
    grunt.loadNpmTasks('grunt-contrib-imagemin');


    // CSS related tasks

    // run the compile sass task
    grunt.loadNpmTasks('grunt-sass');
    // run the css prefix task
    grunt.loadNpmTasks('grunt-autoprefixer');
    // run the cssmin task
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    // JS related tasks

    // run the jsHint task
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // run the uglifyJS task
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // run the concat-files task
    grunt.loadNpmTasks('grunt-contrib-concat');
    

    grunt.registerTask('default', ['watch']);
    
    //TODO: on release install critical css
    // READ: https://www.filamentgroup.com/lab/performance-rwd.html
    grunt.registerTask('build', ['imagemin', 'sass', 'autoprefixer', 'cssmin', 'jshint', 'uglify', 'concat']);    

};

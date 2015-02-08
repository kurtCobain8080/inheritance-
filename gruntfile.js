/**
 * Created by simone.dinuovo on 04/01/15.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        files: "<%= pkg.files %>",
        uglify: {
            options: {
                banner: "/* <%= pkg.name %><%= pkg.version %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
                sourceMap: true,
                sourceMapName: "build/<%= pkg.name %><%= pkg.version %>.map"
            },

            build: {
                src: '<%= files %>',
                dest: "build/<%= pkg.name %><%= pkg.version %>.min.js"
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */\n"
            },
            dist: {
                src: '<%= files %>',
                dest: "build/<%= pkg.name %><%= pkg.version %>.js"
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    if ( !grunt.option('no-uglify') )
        var tasks = ['grunt-contrib-uglify','uglify'];
    else
        var tasks = ['grunt-contrib-concat','concat'];

    grunt.loadNpmTasks(tasks[0]);

    // Default task(s).
    grunt.registerTask('default', [tasks[1]]);

};
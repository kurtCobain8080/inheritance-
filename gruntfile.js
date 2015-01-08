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
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};
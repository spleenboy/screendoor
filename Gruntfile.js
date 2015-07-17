'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			all: ['src/static/**/*.js', 'test/**/*.js', 'Gruntfile.js'],
			checkstyle: 'checkstyle.xml',
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			src: {
				src: ['src/static/**/*.js']
			},
			test: {
				src: ['test/**/*.js']
			}
		},

		simplemocha: {
			all: { src: 'test/**/*-test.js' },
			options: {
				ui: 'bdd',
				reporter: 'spec'
			}
		},

		clean: ['src/build/*/'],

		browserify: {
			dist: {
				files: [{
					'src': 'src/static/scripts/**/*.js',
					'dest': 'src/build/dist.js'
				}, {
					'expand': true,
					'cwd': 'src/games',
					'src': '*/**/*.js',
					'dest': 'src/build/js/'
				}]
			}
		},

		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			src: {
				files: '<%= jshint.src.src %>',
				tasks: ['jshint:src', 'mochaTest']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'mochaTest']
			}
		}
	});

	// task loading
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-simple-mocha');

	grunt.registerTask('test', ['simplemocha', 'jshint:all']);
	grunt.registerTask('default', ['test', 'clean', 'browserify']);
};

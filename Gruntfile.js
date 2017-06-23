module.exports = function(grunt){

	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

		watch:{
			files:['./app/','./app/*.*'],
  		},
  		
  		express: {
  			all: {
  				options:{
					port:4000,
					hostname:'0.0.0.0',
  					bases:['./app/','./app/**/*.*'],
				    livereload: true
  				}
			}
		},

		ngconstant: {
			// Options for all targets
			options: {
				space: '  ',
				wrap: '"use strict";\n\n {\%= __ngModule %}',
				name: 'constantes',
			},
			// Environment targets
			development: {
				options: {
					dest: './app/js/config.js',
				},
				constants: {
			        //package: grunt.file.readJSON('config.json')
					ENV: {
						name: 'development',
						APIEndPoint: 'http://192.168.0.30/'
					}
				}
			},
			production: {
				options: {
					dest: './app/js/config.js'
				},
				constants: {
			        //package: grunt.file.readJSON('config.json')
					ENV: {
						name: 'production',
						APIEndPoint: 'http://api.catchai.cl/'
					}
				}
			}
		},

		open: {
		    all: {
		        path: 'http://localhost:4000/'
		    }
		}

	});
 
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');	
	grunt.loadNpmTasks('grunt-ng-constant');
	grunt.loadNpmTasks('grunt-open');	

	grunt.registerTask('build', [
		'ngconstant:production'
	]);

	grunt.registerTask('prod',[
		'ngconstant:production',
		'express',
		'open',
		'watch'
	]);
	
	grunt.registerTask('dev',[
		'ngconstant:development',
		'express',
		'open',
		'watch'
	]);

	grunt.registerTask('default',['dev']);
};
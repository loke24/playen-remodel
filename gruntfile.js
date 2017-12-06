module.exports = function(grunt){

	grunt.initConfig({

		pkg:grunt.file.readJSON('package.json'),

		
		concat:{
			options:{
				separator:';',
			},
			dist:{
				src:["public/component/controller/*.js","public/component/service/*.js"],
				dest:'public/vendor.js'
			}
		},
		uglify:{
			options:{
				mangle:false
			},
			dist:{
				files:{
					"public/vendor.js":["public/vendor.js"]
				}
			}
		},
		cssmin:{
			target:{
				files:{
					"public/main.min.css":["public/main.css"]
				}
			}
		}

	})

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask("default",["concat","uglify","cssmin"])

};
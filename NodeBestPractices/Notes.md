# [Node.js Best Practices](https://www.codementor.io/nodejs/tutorial/nodejs-best-practices)

1. **Start all projects with** ```npm init```
	```
	mkdir my-new-project
	cd my-new-project
	npm init
	```
2. **Setup** ```.npmrc```
	```
	npm config set save=true
	npm config set save-exact=true
	```
	This makes sure that ```npm install``` always saves the dependency, and that the version is locked to the exact version installed (consistent across different systems).
3. **Add scripts to your** ```package.json```
	```json
	"scripts": {
		"postinstall": "bower install && grunt build",
		"start": "node myapp.js",
		"test": "node ./node_modules/jasmine/bin/jasmine.js"
	}
	```
	The ```start``` script will ensure that when someone runs ```npm start```, npm will run ```node myapp.js```.  The ```postinstall``` script will run after ```npm install``` is run (```preinstall``` can be used to do an action before npm dependencies are installed). ```test``` is run when ```npm test``` is run. Custom scripts can be run using ```npm run-script {name}```
4. **Use environment variables**
	```javascript
	console.log("Running in: " + process.env.NODE_ENV);
	```
	This is the recommended way to decouple code from its environment (be it development, QA, or production).
5. **Use a style guide**
	* [Airbnb](https://github.com/airbnb/javascript)
	* [Google](https://google.github.io/styleguide/javascriptguide.xml)
	* [jQuery](https://contribute.jquery.org/style-guide/js/)
	* [Standard JS](http://standardjs.com/)
6. **Embrace async**
	Run app during development with ```--trace-sync-io``` flag to print warning when app uses synchrnous API.
	Read more on async topics:
	* [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)
	* [Async/Await](https://www.twilio.com/blog/2015/10/asyncawait-the-hero-javascript-deserved.html)
	* [Generators](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators)
7. **Handle errors**
	```javascript
	doSomething()
		.then(doNextStage)
		.then(recordTheWorkSoFar)
		.then(updateAnyInterestedParties)
		.then(tidyUp)
		.catch(errorHandler);
	```
8. **Ensure your app automatically restarts**
	Use a process manager to make sure the app recovers gracefully from a runtime error.
	Possible examples are:
	* [KeyMetric's PM2](http://pm2.keymetricsio/)
	* [Nodemon](http://nodemon.io/)
	* [Forever](https://gihub.com/foreverjs/forever)
	For PM2 installation: ```npm install pm2 -g```, and to launch: ```pm2 start myApp.js```.
9. **Cluster your app to improve performance and reliability**
	Default Node.js runs on single process, but it can be run as multiple instances to take advantage of multiple CPU cores. Using [PM2's cluster mode](http://pm2.keymetrics.io/docs/usage/cluster-mode/): ```pm2 start myApp.js -i max```
	Note that this does not allow processes to share memory or resources. Each process will open its own connection to databases.
10. **Require all dependencies up front**
11. **use a logging library to increase errors' visibility**
	Try logging to [Loggly](https://www.loggly.com/) and using the [winston logging library](https://github.com/winstonjs/winston).
12. **Use helmet if you're writing a web app**
	Best practices for a web app:
	* XSS Protection
	* Prevent Clickjacking using ```X-Frame-Options```
	* Enforcing all connections to be HTTPS
	* Setting a ```Context-Security-Policy``` header
	* Disabling the ```X-Powered-By``` header so attackers can't narrow down their attacks to specific software
	Helmet will configure all this by default, and allow this to be tweaked if necessary.
	```
	npm install helmet
	```
	In code:
	```javascript
	var helmet = require('helmet');
	app.use(helmet());
	```
13. **Monitor your apps**
	PM2 provides option with:
	```
	pm2 interact [public_key] [private_key] [machine_name]
	```
14. **Test your code**
	
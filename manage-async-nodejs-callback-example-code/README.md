# [Handling the Asynchronous Nature of Node.js: Sample Project](https://www.codementor.io/nodejs/tutorial/manage-async-nodejs-callback-example-code)

Sync code:

```javascript
var fs = require("fs");
fs.readFileSync('abc.txt', function (err, data) {
	if(!err) {
		console.log(data);
	}
});
console.log("something else");
```

versus

Async code:

```javascript
var fs = require("fs");
fs.readFile('abc.txt', function (err, data) {
	if(!err) {
		console.log(data);
	}
});
console.log("something else");
```

Callback hell:

```javascript
function readFile (filename, callback) {
	fs.readFile(filename, function (err, data) {
		if(!err) {
			processData(data, function (res) {
				printData(res);
			});
		}
	});
}
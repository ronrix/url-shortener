# My own mvc framework

## run this to start the app
	- npm install
	- npm start
## assets 
	- all static files like images, styles, js are included in here

## connection
	- all databases connection can be created in here, you can also add query builder on your own
	- Mysql, PostGres, etc.
	- add more query builder methods
##### Using mysql
```
	const mysql = require("mysql2");
	const {db_config} = require("../config");
	class Connection {
		constructor() {
			this.connection = mysql.createConnection({
				"host": db_config.server_name,
				"user": db_config.username,
				"password": db_config.password,
				"database": db_config.dbname,
				"port": db_config.port
			});

			this.connection.connect(function(err) {
				if (err) {
					console.log(err);
					return;
				}
				console.log("mysql connection");
			});
		}

		format_query(query, fields) {
			return mysql.format(query, Object.values(fields));
		}
		
	}
```

## controllers
All controller files are in here, every file has it's own handling logic which connects views and models.
```
	class SampleController {
		constructor() {
			// you can add more models to use on your controller
			this.MyModel = new Model();

			// binding this to use models
			this.methods = this.methods.bind(this);
		}
		methods(req, res) {
			const fields = req.body;
			this.MyModel.login(fields);
		}
	}
```
You have to bind this to use your models.

# models
All business logic or databases logic are here to be called by the controller, you can add more models that handles different tables and add logic here.
##### example using mysql
```
const Connection = require("../connection/Connection");

class HomeModel extends Connection {
	constructor() {
		super();
	}
	
	login(fields) {

		const query = this.format_query(`
		SELECT users.id, users.first_name, users.email, users.password
		FROM users
		WHERE users.email = ? AND users.password = ? LIMIT 1;`, fields);

		return new Promise((resolve, reject) =- {
			this.connection.query(query, (err, result) =- {

				if(err) {
					throw err;
					return;
				}

				if(result.length === 0) {
					reject("No user found!");
				}
				else {
					resolve(result);
				}
			});
		});
	}
}

```
	

## routes folder
All routing paths are in here, which controllers should be pass on every routes is what its doing.
You can add more files on specific routes.

## views folder
All html files are in here

## app.js
Is the server file that runs all of this, this is where you could add more libraries.

## routes.js
This handles all the routing in the routes folder, it will include all the files in the routes folder, this is what was exported to be called in the app.js.
Don't modify the code in here.

## config.js
All global variables like PORT, db configurations are in here.

## Profiler (Enabling Profiler like in CodeIgniter) (modules/profiler)
You can see it inside module folder.
This feature displays more information, like queries that was created, http headers, post and get datas etc.
You can turn this on inside controller using req paramater.
```
	// this: the this is for getting the controller that was used and also the method that was called
	// req: to get more information 
	// true: default false
	req.enable_profiler(this, req, true);

	// and use res.view() to display the profiler in the dom instead of using res.render()
	res.view("views/file.html", data);
```
And add the html file of the profiler on your view files.
```
	//views/index.ejs
	<%- include("../modules/profiler/profiler.ejs") %>
```

## Form Validation
There are some validation here as default.
You can add more.
You can use it on your models.
```
	const FormValidation = require("../modules/validation/Validation");

	// instantiate it in the model constructor
	this.FormValidation = new FormValidation();

	// use it on any model methods like this
	this.FormValidation.is_email_valid(fields);
```

## File naming convention
| folder	  | filename			  |
| :---------: | :-------------------: |
| controllers | example.controller.js |
| views	 	  | example.view.js 	  |
| models 	  | example.model.js 	  |
| connection  | example.connection.js |
| routes 	  | example.router.js     |

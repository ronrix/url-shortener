const express = require("express");
const {PORT} = require("./config");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cookieParser());
app.use(bodyParser.json({ extended: true })); // for now (install body-parser)
// including all route files (DON'T CHANGE THIS)
const Routes = require("./routes");
Routes.get().then(routes => {
	app.use([...routes]);
});


app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// connecting to db with sequelize
const db = require("./models");
db.sequelize.sync().then(res => {
/*
	DOCU: setting up profiler to get the data to be dispplayed, you can turn the profile by doing
		req.enable_profiler = true
	OWNER: ronrix
*/
// const Profiler = require("./modules/profiler/Profiler");
// app.use(new Profiler().setup);

	app.listen(PORT, () => console.log(`Server running in PORT ${PORT}`));
})

/*
	DOCU: this file is the server file which handles all files and run it
		include here other libraries to be used
	OWNER: ronrix
*/ 
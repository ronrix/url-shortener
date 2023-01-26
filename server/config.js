const base_url = "http://localhost:8000";
const PORT = 8000;

const db_config = {
	server_name: "localhost",
	username: "root",
	password: "ronrix",
	dbname: "url_shortener",
	port: 3306,
}

module.exports = {
	PORT,
	db_config,
	base_url
}

/*
	DOCU: this file is for db configuration and other global variables
	OWNER: ronrix
*/ 
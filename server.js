const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const path = require('path');
const cors = require('cors');
const pg = require('pg');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const app = express();
const cookieParser = require('cookie-parser'); 


app.use('/build',express.static(path.join(__dirname, 'build')));


app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());


let user = 'ulurpczi';
let pass = 'TVQxxaVGcvh2ZFlNZHXaHReKN_3DfZbm';
let config = {
	host:"nutty-custard-apple.db.elephantsql.com",
	user: user,
	password: pass,
	database: user,
	post: 5432,
	ssl: true
}
//Generating pool API
let pool = new pg.Pool(config);
let db;

pool.connect((err, result) => {
  if (err) throw new Error(err);
  else console.log("Connecting to DB..."); 
	db = result;
 
//old query(just for reference)	
// db.query('SELECT * FROM snackify;', (err, result) => {
  //     if(err){
  //         throw new Error(err)
  //     }
  //   console.log('------>Looking for rows', result.rows);
  //   db.end();
	// });

	app.use('/auth', authRoutes);


	////////////////
	//////home/////
	///////////////

	app.get('/', (req, res) => {
		console.log(req.user, 'from the home route'); 
		res.sendFile(path.join(__dirname, 'index.html'));
	});


	//=================================================================
	
	app.get('/currentuser', (req, res) =>{
		//make request to DB and for req.user value and send to client
		res.send('example Data'); 
	});
	
	//=================================================================



	app.get('/test', (req, res) => {
		console.log(req.session, 'req.session from test');
		console.log(req.user, 'im from the /test'); 
		res.send(req.user); 
		// res.sendFile(path.join(__dirname, 'index.html'));
		// res.send(`this is my body ${req.user} `); 
	}); 


	app.post('/submission',(req,res)=>{
		db.query(`UPDATE snackify SET submissionCount = submissionCount -1 WHERE '${req.user.userName}';
				  UPDATE snackify SET snackphoto = '${req.user.snackphoto} WHERE '${req.user.userName}';
				  UPDATE snackify SET comments = '${req.user.comments}' WHERE '${req.user.userName}';`, 
		(err,result)=>{
			if(err){
				throw new Error(err)
			}
		});

	});

	app.post('Populating Front End with stuff',(req,res)=>{

		db.query(`SELECT "userName" FROM snackify WHERE snackphoto IS NOT NULL;
				  SELECT snackphoto FROM snackify;
				  SELECT votes FROM snackify WHERE snackphoto IS NO; NULL;
				  SELECT comments FROM snackify WHERE snackphoto IS NOT NULL;
				  `
		,(err,result)=>{
			if(err){
				throw new Error(err)
			}
		});


	}) 

	// app.post('/submission',(req,res)=> {
	// 	db.query(`UPDATE snackify SET votecount = votecount - 1 WHERE '${req.user.userName}';`, (err, result) => {
	// 		if(err){
	// 			throw new Error(err)
	// 		}
	// 	});
	// 	db.query('UPDATE snackify SET votes = votes + 1 WHERE ;', (err, result) => {
	// 		if(err){
	// 			throw new Error(err)
	// 		}
	// 	});
	// });

	app.listen(3000, () => {
		console.log('listening on port 3000...');
	});

	

})


UPDATE snackify SET submissionCount = submissionCount -1 WHERE "userName" = 'josephwu1994';UPDATE snackify SET snackphoto = 'test' WHERE "userName" = 'josephwu1994';UPDATE snackify SET comments = 'testestt' WHERE "userName" = 'josephwu1994';


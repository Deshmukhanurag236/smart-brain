const handleSignin = (bcrypt,db)=>(req,res)=>{
			// res.json("signin");
		// 	if(req.body.email === database.users[0].email  &&
		// 		req.body.password === database.users[0].password){
		// 		res.json("success");
		// 		console.log("success",req.body.email,req.body.password,database.users[0].email ,database.users[0].password)
		// }else{
		// 	console.log("success",req.body.email,req.body.password,database.users[0].email ,database.users[0].password)

		// 	res.status(400).json("error logging in");

		// }
		          const { email, password } = req.body;
						  if (!email || !password) {
						    return res.status(400).json('incorrect form submission');
						  }
					db.select('email','hash')
						.from('login')
						.where('email', '=' , req.body.email)
						.then(response=>{
							const valid=bcrypt.compareSync( req.body.password,response[0].hash)
							if(valid){
								db('users').select().where('email', '=' , req.body.email).then(user=>{
									res.json(user);	
								})
							}else{
									res.status(400).json("error logging in");
							}
						})
						.catch(err=>res.json("not Registered"))

}

module.exports= {
	handleSignin: handleSignin
};
const handleImage = (db)=>(req,res)=>{
	// const {email} = req.body;
	// let found= false;
	// database.users.forEach(user=>{
	// 	if(user.email===email){
	// 		found=true;
	// 		user.entries++;
	// 		return res.json(user)
	// 	}
	// })
	// if(!found)
	// 	res.status(404).json("not found")

		db('users').where('email','=',req.body.email)
						 .returning('*')
						 .increment('entries',1)
						 .then(response=>{
						 	res.json(response[0]) 
						 })
						 .catch(err=>res.json("Error Incrementing it!"))
}

module.exports={
	handleImage:handleImage
};
const handleProfileGet=(db)=>(req,res)=>{
	// const {id} = req.params;
	// let found= false;
	// database.users.forEach(user=>{
	// 	if(user.id===id){
	// 		found=true;
	// 		return res.json(user)
	// 	}
	// })
	// if(!found)
	// 	res.status(404).json("not found")
	db('users').where('id','=', req.params.id)
						 .returning('*')
						 .then(response=>{
						 	if(response.length)
						 			res.json(response[0]) 
						 	else
						 		res.json("Wrong Id")
						 })
						 .catch(err=>res.json("no User Exist!"))
}




module.exports={
	handleProfileGet:handleProfileGet

};
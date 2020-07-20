const handleRegister=(db,bcrypt)=>(req,res)=>{

									db.transaction(trx=>{
												trx.insert({email:req.body.email,
																	hash:bcrypt.hashSync(req.body.password)
																	})
														.into('login')
														.returning('email')
														.then(loginEmail=>{
															return trx('users')
																			.returning('*')
																			.insert({name:req.body.name,
																						email:loginEmail[0],
																						joined:new Date()
																						})
																			.then(user=>{
																				res.json(user[0])
																			})
																		})
													
														.then(trx.commit)
														.catch(trx.rollback);

									})
									.catch(err=>res.json("taken"))

}

module.exports={
	handleRegister:handleRegister
};
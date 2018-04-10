var express = require ('express');
var app = express();
var fs= require ('fs');
var redis=require ('redis');
var publisher = redis.createClient();
var subscriber = redis.createClient();

var bodyParser =require('body-parser');



var client = redis.createClient();

var server =app.listen(8081,function(){
var port= server.address().port
		console.log("listening at port localhost:%s",port)
	})
		client.on('connect',function(){
		console.log('Connected to redis');
	});

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended:false}))
	

	app.post('/serviceList', function(req,res){
		
		var data = JSON.stringify(req.body.reset);
		client.set('reset',data);
		publisher.publish("serviceList",data);
		console.log("Client made a RESET");
		console.log(data);
		res.end("Reset Done!!");	
		})
		
	app.post('/saveList',function(req,res){
		var data = JSON.stringify(req.body.services);
		client.set('services',data);
		publisher.publish("saveList",data);
		console.log("List of services saved");
		console.log(data);
		res.end("Services SAVED!!");
		
	})

	app.post('/serviceConfig',function(req,res){
		var vlan=req.body["config"]["vlan"][0].Id;
		//console.log('config'+vlan);
		console.log(vlan);
		if(vlan==5){
			var action=req.body["config"].action;
		console.log(action);
		if(action == 'add')
		{
			var data = JSON.stringify(req.body.config);
		client.set('config5',data);
		publisher.publish("serviceConfig",data);
		console.log('successfully added json data');
		console.log(data);
		res.end("Configuration for vlan 5 SAVED!!");	
		}
			
		 if(action == 'delete'){
			client.del('config5');
			publisher.publish("serviceConfig","Configuration deleted");
			console.log('configuration for vlan 5 DELETED!!');
			res.end('config5 deleted');
		}
	}
		if(vlan==6){
			var action=req.body["config"].action;
		console.log(action);
		if(action == 'add')
		{
			var data = JSON.stringify(req.body.config);
		client.set('config6',data);
		publisher.publish("serviceConfig",data);
		console.log('successfully added json data');
		console.log(data);
		res.end("Configuration for vlan 6 SAVED!!");	
		}
			
		 if(action == 'delete'){
			client.del('config6');
			publisher.publish("serviceConfig","Configuration deleted");
			console.log('configuration for vlan 6 DELETED!!')
			res.end('config6 deleted');
		}
	}
		
	
		})

	

	app.get('/stats',function(req,res){
		client.get('stats', function(err, data){
			if(err){
				throw err;
			}else{
				console.log("successfully sent json data");
					console.log(data);
					res.end(data);
			}
					
			});

	})

	app.get('/serviceList',function(req,res){
		client.get('reset',function(err,data){
			if(err){
				throw err;
			}else{
			console.log('Reset data stored in Redis DB');
			console.log(data);
			res.end(data);
		}
		});
	})

	app.get('/saveList',function(req,res){
		client.get('services',function(err,data){
			if(err){
				throw err;
			}else{
			console.log('Service list data stored in Redis DB');
			console.log(data);
			res.end(data);
			}
			
		});
	})

	app.get('/serviceConfig',function(req,res){
		client.get('config5',function(err,data){
			if(err){
				throw err;
			}else{
			console.log('Configuration data stored in Redis DB');
			console.log(data);
			res.end(data);
		}
		});
	})

/*var action=req.body["config"].action;
		console.log(action);
		if(action == 'add')
		{
			var data = JSON.stringify(req.body.config);
		client.set('config',data);
		publisher.publish("serviceConfig",data);
		console.log('successfully added json data');
		res.end("Configuration SAVED!!");	
		}
			
		 if(action == 'delete'){
			client.del('config');
			publisher.publish("serviceConfig","Configuration deleted");
			console.log('configuration deleted')
			res.end('config deleted');
		}*/	



/*subscriber.subscribe("stats");
		subscriber.on('message',function(channel,message){
			console.log(channel,message);
			// /client.set('stats',message);
			res.end(message);*/
	





/*app.get('/addUser',function(req,res){
	fs.readFile(__dirname+"/"+"user.json",'utf8',function(err,data){
		data=JSON.parse(data);
		data["user4"]=user["user4"];
		console.log(data);
		res.end(JSON.stringify(data));
	});
})*/
/*app.get('/statswithoutparse',function(req, res){
	fs.readFile(__dirname+"/"+"user.json",function(err,data){
	client.set('json',data);
	});
		
	client.get('json', function(err, reply){
	fs.writeFile(__dirname+"/"+"write.json",reply,function(err){
	if(err){
	console.log(err);	
		}else
	{
		console.log('successfully added json data');
		console.log(reply);
		res.end(reply);
		}			
	});
	});

})*/
/*app.get('/stats',function(req, res){
	fs.readFile(__dirname+"/"+"user.json",function(err,data){
		
	response=JSON.stringify(JSON.parse(data));
	console.log(response["config"]["vlan"][0]["firewall"][1].type);
	//client.set('json',response["config"]["vlan"][0]["firewall"][1].type);
	//client.set('json',response);
	});
	
		
	client.get('json', function(err, reply){
 	fs.writeFile(__dirname+"/"+"write.json",reply,function(err){
 	if(err){
 	console.log(err);	
		}else
	{
 		console.log('successfully added json data');
 		console.log(reply);
		res.end(reply);
 		}			
 	});
	
 	});

 })*/
/*
app.get('/stats',function(req, res){
	fs.readFile(__dirname+"/"+"config.json",function(err,data){	
	response=JSON.parse(data);
	console.log(response["config"]["vlan"][0]["firewall"][1].type);
	client.set('json',response["config"]["vlan"][0]["firewall"][1].type);
	})*/
var express = require ('express');
var app = express();
var fs= require ('fs');
var id=2;
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
		//console.log(typeof(req.body.reset));

		var data = JSON.stringify(req.body.reset);

		client.set('reset',data);
		publisher.publish("serviceList",data);
		console.log("Client made a RESET");
		console.log(data);
		//res.sendStatus(200);
		res.end("Reset Done!!");
		
	})

	app.post('/saveList',function(req,res){
		var data = JSON.stringify(req.body.services);
		client.set('services',data);
		publisher.publish("saveList",data);
		console.log("List of services saved");
		console.log(data);
		//res.sendStatus(200);
		res.end("Services SAVED!!");
		
	})

	app.post('/serviceConfig',function(req,res){

		var data = JSON.stringify(req.body.config);
		client.set('config',data);
		client.set('stats',data);
		publisher.publish("serviceConfig",data);
		client.get('config', function(err, reply){
			fs.writeFile(__dirname+"/"+"configUI.json",reply,function(err){
			if(err){
			console.log(err);
			res.sendStatus(404);	
					}else
					{
						console.log('successfully added json data');
						console.log(reply);
						//res.sendStatus(200);
						res.end("Configuration SAVED!!");
					}			
			});
	
		});

	})

	app.get('/stats',function(req,res){
		//subscriber.subscribe("stats");
		client.get('stats', function(err, data){
			fs.writeFile(__dirname+"/"+"statsUI.json",data,function(err){
				if(err){
					console.log(err);
					res.sendStatus(404);
				}else{
					console.log("successfully sent json data");
					console.log(data);
					res.end(data);
					
				}
			});
		
		});

	})

	





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
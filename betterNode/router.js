  var http = require("http");
  var url = require('url');
  var fs = require('fs');
  var io = require('socket.io');



var mainPage = true;

    var server = http.createServer(function(request, response){
        var path = url.parse(request.url).pathname;
	console.log(path);
        console.log('listening....');
	switch(path){
            case '/':
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(fs.readFileSync(__dirname+"/index.html"));
                response.end();
                mainPage=true;
		break;
            case '/feedBack.html':
                fs.readFile(__dirname + path, function(error, data){
                    if (error){
                        response.writeHead(200,{'Content-Type':'text/html'});
                        response.write(
			fs.readFileSync(__dirname+"/index.html"));

                        mainPage=true;
			response.end();
			console.log('Got a feedback!');
                    }
                    else{
                        response.writeHead(200, {"Content-Type": "text/html"});
                        response.write(data, "utf8");
                        response.end();
			mainPage=false;
                    }
                });
                break;
	    
            default:
	//	console.log("default case path");
                response.writeHead(404);//200, {"Content-Type":"text/html"});
                response.write("fuck i dont know where you went..");
//			fs.readFileSync(__dirname+"/index.html") );
                response.end();
                break;
        }
    });

    server.listen(8001);
    var listener = io.listen(server);
	listener.sockets.on('connection',function(socket)
			{

				console.log('socket connected');
				//console.log(socket.id);
				console.log(mainPage);
				var  data = readFile();		
				if(mainPage)
				{
					setInterval(function()
					{	//write file read system here
			
					readFile();
					//console.log(jsondata);
				//socket.emit('message',{'message': new Date()});
				socket.emit('updateImg',{'data':jsondata					});
					},400);
				};


			socket.on('disconnect',function(){
				console.log('bye!');
				});
		//socket.emit('message',{'message':'FUCK YOU!'});
			socket.on('postFeedback',function(data){
			console.log('posted??');
			console.log(data);		
			saveFile(data);
			});
		});



var jsondata;
function readFile()
{
	//var data;
	 var file = fs.readFile(__dirname+"/sensorData.json",'utf8',function(err,e)
                {
                        if(err){
			console.log(err);
			};// throw err;
                        //var data = JSON.parse(e.data);
                        //console.log(e.data);//data);
		//	console.log(e);	
		 	jsondata =e;
		//	return data;
                });
	
        //return data;
};

function saveFile(data)
{
 var id = (new Date()).toLocaleTimeString();
	fileName ="FeedBack"+id+".json";
	writeout=JSON.stringify(data);
 // 	console.log(writeout);	
	fs.writeFile(__dirname+'/feedBack/'+fileName,writeout,
		'utf8',function(err){
			if(err)
			{
			 console.log(err);
			}
			console.log(__dirname+fileName);
			console.log('Saved file!');
		
			});

};



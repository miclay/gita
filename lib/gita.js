var exec=require('child_process').exec;

var gita={};

gita.conf=function(finish){
	finish=finish||function(){};
	
};

gita.status=function(){
	var p=exec('git status',function(err,stdout,stderr){
		if(err){
			console.log(err);
			return;
		}
	});
	return p;
};

module.exports=gita;
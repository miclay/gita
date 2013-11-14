var exec=require('child_process').exec;

var gita={};

gita.init=function(finish){
	finish=finish||function(){};
	var p=exec('git init',function(err,stdout,stderr){
		if(err){
			console.log(err);
			return;
		}
		finish();
	});
	return p;
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
gita.st=gita.status;

gita.add=function(finish){
	finish=finish||function(){};
	var p=exec('git add .',function(err,stdout,stderr){
		if(err){
			console.log(err);
			return;
		}
		finish();
	});
	return p;
};

gita.ci=gita.commit=function(comment,finish){
	comment=comment||'commit without comment';
	finish=finish||function(){};
	var p=exec('git commit -a -m "'+ comment +'"',function(err,stdout,stderr){
		if(err){
			console.log(err);
			return;
		}
		finish();
	});
	return p;
};

gita.push=function(branch,remote,finish){
	branch=branch||'master';
	remote=remote||'origin';
	finish=finish||function(){};
	var p=exec('git push '+remote+' '+branch,function(err,stdout,stderr){
		if(err){
			console.log(err);
			return;
		}
		finish();
	});
	return p;
};

gita.tag=function(){
	/*var p=exec('git tag .',function(err,stdout,stderr){
		console.log(stdout);
		console.log(stderr);
		console.log(err);
	});*/
};

module.exports=gita;
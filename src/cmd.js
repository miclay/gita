var gita=require('./gita')
	,fs=require('fs');
var cmd={};

cmd.conf=function () {
	console.log('conf ok')
}

cmd.publish=function (branch,comment) {
	if(!fs.existsSync('.git')){
		gita.init(function(){
			gita.add(function(){
				gita.ci(comment);
			});
		});
	}
	//gita.add();
	//gita.ci(comment);
	//gita.push(branch);
}

module.exports=cmd;
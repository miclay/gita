var cmd=require('./cmd');

var gita={};

gita.setConf=function(){
	
};

gita.status=function(){
	
};

gita.mergeRequest=function(mrBranchName){
	mrBranchName=mrBranchName||'mr_user_0918_2';
	// 从master同步到当前分支
	// 从当前分支把代码推送到远程的mr_user_0918_2临时分支
	console.log(cmd.getCurrentGitBranch());
};

module.exports=gita;
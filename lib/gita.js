var cmd=require('./cmd');
var utils=require('./utils');

var gita={};

gita.setConf=function(key,value){
	cmd.setGitConfig(key,value);
};

gita.mergeRequest=function(mrBranchName){
	var now=new Date();
	var defaultMrBranch='mr_'+cmd.getGitUserName()+'_'+utils.now('MMdd_hhmmss');
	var currentBranch=cmd.getCurrentGitBranch();
	mrBranchName=mrBranchName||defaultMrBranch;
	// 从当前分支把代码推送到远程的mr_user_0918_2临时分支
	cmd.exec('git push origin '+currentBranch+':'+mrBranchName,function(error,stdout,stderr){
		console.log(error,stdout,stderr);
	});
};

module.exports=gita;
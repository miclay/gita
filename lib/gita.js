var fs=require('fs');
var path=require('path');
var cmd=require('./cmd');
var utils=require('./utils');
var config=require('./config');

var gita={};

gita.setConf=function(key,value){
	console.log(key,value);
	if(key===undefined||value===undefined){
		return;
	}
	if(value===null){
		//移除配置项
		config[key]=undefined;
	}else{
		config[key]=value;
	}
	var filePath=path.resolve(__dirname+'/config.json');
	fs.writeFile(filePath,JSON.stringify(config,null,'\t'),function(err){
		if(err){
			console.error(err);
		}else{
			console.info('{'+key+'} is set as {'+value+'} successfully.');
		}
	});
};
gita.removeConf=function(key){
	gita.setConf(key,null);
};

/**
 * 从当前分支把代码推送到远程的mrBranchName临时分支
 * @param  {string} mrBranchName 指定mergerequest分支名字
 */
gita.mergeRequest=function(mrBranchName){
	var now=new Date();
	var defaultMrBranch='mr_'+cmd.getGitUserName()+'_'+utils.now('MMdd_hhmmss');
	var currentBranch=cmd.getCurrentGitBranch();
	mrBranchName=mrBranchName||defaultMrBranch;
	console.info('Program is running...');
	cmd.exec('git push origin '+currentBranch+':'+mrBranchName,function(error,stdout,stderr){
		console.log(stdout);
		console.log(stderr);
	});
};

module.exports=gita;
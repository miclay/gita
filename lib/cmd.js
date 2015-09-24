var exec=require('child_process').exec;
var fs=require('fs');
var path=require('path');
var utils=require('./utils');
var config=require('./config');

var cmd={};

/**
 * 异步执行命令通过回调函数返回结果
 * 对于执行时间较长的命令建议用异步方式
 * @param  {string}   command command命令字符串
 * @param  {function} cb      异步回调函数
 * @return {object}           返回进程实例对象
 */
cmd.exec=function(command,cb) {
	cb=cb||function(){};
	if(config.debug=='yes'){
		console.info('[ '+command+' ] start:');
	}
	var p=exec(command,function(error,stdout,stderr){
		if(error){
			console.log(error,stdout,stderr);
		}
		cb(error,stdout,stderr);
	});
	if(config.debug=='yes'){
		p.on('exit',function(code,signal){
			console.info('[ '+command+' ] '+p.pid+' exit:',code,signal);
		});
	}
	return p;
};

/**
 * 同步执行命令等待结果返回
 * NodeJS v0.12 会原生支持execSync
 * 如果你的NodeJS版本已经原生支持execSync，请放弃使用本方法
 * @param  {string} command  command命令字符串
 * @return {string}          返回stdout字符串
 */
cmd.execSync=function(command) {
	var timeout=5000;
	var startTime=Date.now();
	var stdoutFile=path.resolve('./stdout'+startTime+Math.random());
	var errorFile=stdoutFile+'error';
	var doneFile=stdoutFile+'done';
	var p,result;
	var removeFile=function(){
		if(fs.existsSync(stdoutFile)){
			fs.unlinkSync(stdoutFile);
		}
		if(fs.existsSync(errorFile)){
			fs.unlinkSync(errorFile);
		}
		if(fs.existsSync(doneFile)){
			fs.unlinkSync(doneFile);
		}
	};
	command+=' 1>'+stdoutFile+' 2>'+errorFile+' && echo ok >'+doneFile;
	if(config.debug=='yes'){
		console.info('[ '+command+' ] start:');
	}
	removeFile();
	p=exec(command);

	while(!fs.existsSync(doneFile) 
		&& (!fs.existsSync(errorFile) || (fs.existsSync(errorFile) && fs.readFileSync(errorFile,'utf8')==''))
		&& Date.now()-startTime<timeout){}

	if(fs.existsSync(doneFile)){
		result={
			stdout:fs.readFileSync(stdoutFile,'utf8')
		};
	}else{
		result={
			stderr:fs.readFileSync(errorFile,'utf8')
		};
	}
	if(config.debug=='yes'){
		console.info('[ '+command+' ] '+p.pid+' exit');
	}
	removeFile();
	return result;
};

cmd.getCurrentGitBranch=function(){
	var result=cmd.execSync('git branch | grep "*"')||{};
	if(!result.stderr){
		var branch=result.stdout.replace(/^\*\s*|\s*$/g,'');
		return branch;
	}else{
		return '';
	}
};

cmd.getGitUserName=function(){
	var result=cmd.execSync('git config user.name')||{};
	if(!result.stderr){
		return utils.trim(result.stdout);
	}else{
		return '';
	}
};

module.exports=cmd;
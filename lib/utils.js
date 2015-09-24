var utils={};

utils.trim=function(str) {
	return str.replace(/^\s+|\s+$/g,'');
};

utils.now=function(format){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	var hour=date.getHours();
	var minute=date.getMinutes();
	var second=date.getSeconds();
	var rs=(format||'yyyy-MM-dd hh:mm:ss')
		.replace('yyyy',year)
		.replace('yy',(''+year).slice(-2))
		.replace('MM',('0'+month).slice(-2))
		.replace('M',month)
		.replace('dd',('0'+day).slice(-2))
		.replace('d',day)
		.replace('hh',('0'+hour).slice(-2))
		.replace('h',hour)
		.replace('mm',('0'+minute).slice(-2))
		.replace('m',minute)
		.replace('ss',('0'+second).slice(-2))
		.replace('s',second)
	return rs;
};

module.exports=utils;
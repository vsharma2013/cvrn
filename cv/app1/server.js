var fs = require('fs');

var rootDir = "/Users/vishal/work/CV_OUT/";

function checkCVTxt(){
	var start = 848;
	var end = 3272;
	var i = 1;
	var missing = 0;

	while(i <= end){
		var fName = 'r' + i + ".txt";
		var fPath = rootDir + fName;
		var text = fs.readFileSync(fPath);
		var s = '{ \"name\" : \"' + fName + '\", \"content\" : \"' + text + '\" }';
		
		try{
			JSON.parse(s);
		}
		catch(e){
			console.log(e);
			console.log(fName);
			missing++
		}
		i++;
	}

	console.log("missing = " + missing);
}

function runExperienceTest(){
	var start = 1;
	var end = 3272;
	var i = 1;
	var missing = 0;
	var expStrs = [];

	while(i <= end){
		var fName = 'r' + i + ".txt";
		var fPath = rootDir + fName;
		var text = fs.readFileSync(fPath).toString();
		expStrs = expStrs.concat(getExperienceStringFromCV(text));
		i++;
	}

	//console.log(expStrs);
	fs.writeFile(rootDir+"exp.txt", expStrs.join('\n'), function(){});
}

function getExperienceStringFromCV(cv){
	var needle = 'experience'
	var re = new RegExp(needle,'gi');
	var results = new Array();//this is the results you want
	while (re.exec(cv)){
	  results.push(re.lastIndex);
	}
	//console.log(results);
	var exp = [];
	try{
		results.forEach(function(r){ 
			var ex = cv.substr(r - 40,  80);
			exp.push(ex)
		});
	}
	catch(e){
		console.log('error in getExperienceStringFromCV()...')
	}
	return exp;
}

runExperienceTest();







"use strict";

var sys = require('sys');
var spawn = require('child_process').spawn;
var path = require('path');
var application = undefined;

var applicationStart = function () {
	//재시작할 스크립트 파일이 파라메터에 포함되어 있다면,
	if (process.argv.length === 3 && process.argv[2].length > 0) {
		var scriptPath = path.join(__dirname, process.argv[2]);
		var spawnArguments = [scriptPath];

		//child process 시작
		application = spawn('node', spawnArguments);

		//child process 의 메시지 출력
		application.stdout.on('data', function (data) {
			sys.print(data);
		});

		//child process 의 오류 출력
		application.stderr.on('data', function (data) {
			sys.error(data);
		});

		//child process 종료 시
		application.on('close', function (code) {
			//종료 코드가 255인 경우 재시작
			if (code === 255) {
				sys.log('\x1b[36m' + 'RESTART FOREVER -> RESTART' + '\x1b[0m');
				applicationStart();
			}
		});
	}
	else {
		sys.log('\x1b[36m' + 'RESTART FOREVER -> NO FILE' + '\x1b[0m');
	}
};

//프로세스 종료
process.on('exit', function (code) {
	sys.log('\x1b[36m' + 'RESTART FOREVER -> END' + '\x1b[0m');
});

//오류 발생
process.on('uncaughtException', function (err) {
	sys.log('\x1b[36m' + 'RESTART FOREVER -> ERROR : ' + '\x1b[0m' + err);
	application.kill();
});

sys.log('\x1b[36m' + 'RESTART FOREVER -> START' + '\x1b[0m');
applicationStart();

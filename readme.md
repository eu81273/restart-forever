## restart-forever

forever, nodemon 와 유사하게 node.js application이 종료되면 바로 재시작하는 script입니다.
파일 변경 감지 기능은 없고, application이 종료되면 다시 실행시키는 기능만으로 구성되어 있습니다.
application이 종료되어도 다시 재시작하는 로직에 대해 이해를 돕기 위해 작성되었습니다.

* 사용예는 아래와 같습니다.

```
$ node index.js 실행할파일명
```

* 실행할 파일은 종료시 아래와 같이 종료 코드를 255로 해주어야 합니다.

```
process.exit(255);
```

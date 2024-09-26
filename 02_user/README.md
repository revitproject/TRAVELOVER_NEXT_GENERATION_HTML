# gulp 통합세팅

## Initial Setup
1. node.js 설치 v122.7.0 : [node.js](https://nodejs.org/en/download/)

- npm 삭제 : npm uninstall npm -g

2. gulp3.x.x 버젼이면 삭제 후재설치
3. gulp 삭제 : npm rm -g gulp
4. gulp 터미널 설치 : npm install -g gulp-cli
5. 패키지 업데이트 :

```
npm install -g npm-check-updates
ncu -u
npm install
```

6. package.json(node module) 터미널 설치 : npm install
7. gulpfile.js 작업환경 터널 실행

## "gulpfile.js" 기능 및 실행방법(터미널실행)

- sass 통합, min.css 추출, sourcemaps생성
- autoprefixer 지 원
- js 통합, min.js 추출, sourcemaps생성
- sprite 이미지 통합 `_sp_icons.scss`, `_sp_forms.scss` 파일 생성
- SVG아이콘을 웹폰트 통합 폰트 `_sp_iconfont.scss` 파일 생성
- 이미지 최적화 ~~[사용안함]~~

1. 배포모드에서 브라우져 싱크 실행. `gulp`
2. 배포모드 산출물 추출. `gulp build`



## Notes
<blockquote>
  "src"은 작업용홀더 이고 "dist"는 src에서 생성된 홀더입니다.
  font의 경우 "src"가 아닌 "dist\resources\css\fonts"안에 직접 넣어줘야 합니다.

  guide 폴더는 코딩 작업가이드 파일 입니다.
</blockquote>
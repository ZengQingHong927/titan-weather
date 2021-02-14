# Weather Website (Serverless)

## 前端項目啟動部署

1. 項目以靜態打包編譯生成build文件夾，使用nginx啟動靜態文件（index.html）

2. 在項目根目錄下創建nginx.config配置文件

3. 最主要設定參數，設定服務端口，路由通配訪問路由 / 時，root 指向打包編譯完的靜態文件夾 build，

```txt

server {
    listen       3000;
    root         html;

    location / {
        root /Users/nicktseng/Program/demo/aws-sam-sls/aws-rds-exercise/build;
        try_files $uri $uri/ /index.html;
    }
}

```

4. 關閉項目nginx啟動的前端項目

使用cmd ps -ef | grep nginx 查詢PID
kill -QUIT PID

5. aws awscli deploy s3

<https://andyyou.github.io/2019/08/22/deploy-react-app-to-s3-step-by-step/>

先創建bucket titan-weather
permission / 設定policy / static host
npm run build
aws s3 sync build/ s3://titan-weather --acl public-read

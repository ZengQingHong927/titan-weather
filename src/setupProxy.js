var   { createProxyMiddleware } = require ("http-proxy-middleware");

module.exports = function (app) {
        // app.use ("/api",
        //         createProxyMiddleware ({
        //                 target: "http://127.0.0.1:3020",
        //                 changeOrigin: true,
        //                 secure: false
        //         })
        // );

        app.use ("/photos",
                createProxyMiddleware ({
                        target: "https://api.unsplash.com",
                        changeOrigin: true,
                        secure: false,
                        // pathRewrite: {
                        //         '^/photos': '',
                        // }
                })
        );

        app.use ("/dev",
                createProxyMiddleware ({
                        target: "https://hlxlxn1h24.execute-api.us-east-1.amazonaws.com",
                        changeOrigin: true,
                        secure: false,
                })
        );

        app.use ("/entry",
                createProxyMiddleware ({
                        target: "http://localhost:3020/dev",
                        changeOrigin: true,
                        secure: false
                })
        );

        // app.use ("/admin",
        //         createProxyMiddleware ({
        //                 target: "http://127.0.0.1:3020",
        //                 changeOrigin: true,
        //                 secure: false
        //         })
        // );

        // app.use ("/upload",
        //         createProxyMiddleware ({
        //                 target: "http://127.0.0.1:3020",
        //                 changeOrigin: true,
        //                 secure: false
        //         })
        // );

        // app.use ("/baidu",
        //         createProxyMiddleware ({
        //                 target: "https://www.baidu.com/",
        //                 changeOrigin: true,
        //                 secure: false,
        //                 pathRewrite: {
        //                         "^/baidu": ""
        //                 }
        //         })
        // );
};
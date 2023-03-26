const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
    })
  );
};

// 로컬 4000번 포트에 열어둔 서버와 http 통신
// 프론트엔드에서 /api 로 시작하는 요청을 서버에서 처리
// 서버에도 /api로 시작하는 요청을 처리 가능

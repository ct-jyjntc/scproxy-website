import { defineConfig } from 'vite';

// Angular 21 的 `ng serve` 底层使用 Vite 作为开发服务器。
// 当通过自定义域名/反向代理访问时，Vite 会启用 Host 校验以防 DNS rebinding，
// 需要显式把允许的 Host 加到 allowedHosts 里。
export default defineConfig({
  server: {
    allowedHosts: ['scpxy.rainflowtb.com'],
  },
});


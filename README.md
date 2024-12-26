# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
<!-- 
- Sử dụng redux/redux-toolkit để quản lý trạng thái và gọi api 
- Sử dụng typescript để viết mã logic hơn tránh sai sót và nguyên tắt hơn
- Sử dụng tailwindcss để code nhanh hơn
- Sử dụng react-router để chuyển trang mượt mà
- Sử dụng thư viện @Tippy.js để quản lý dropdown
- Sử dụng thư viện react-youtube: giúp lấy video từ youtube dễ dàng hơn và hỗ trợ các onPlay,...
- Sử dụng conText API để quản lý và truyền các dữ liệu đến tất cả các component trong dự án
- Thư viện React-Spring để tạo animation chuyển động mượt mà(useSpring tạo các animation để chuyển đổi các trạng thái, useSpring: tọa nhiều animtion cho nhiều phần tử cùng lúc)
-->

<!-- 
** Cần học:
- React window: giúp render ra các phần tử chỉ hiển thị nếu không nằm trong vùng hiển thị thì không
- Các thư viện cuộn vô hạn: React infinite loader, REact infinite Scroller, Tanstack virtual
 -->
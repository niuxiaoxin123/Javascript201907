const { override, fixBabelImports, addLessLoader } = require('customize-cra');
// 按需加载组件
module.exports = override(
      fixBabelImports('import', {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true
      }),
      addLessLoader({
          javascriptEnabled: true,
          modifyVars: { '@primary-color': '#1DA57A'      },
      })
);

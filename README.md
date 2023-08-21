# Hexa Hub

## 子模块相关（暂无子模块 可以忽略此步骤）

可以忽略此步骤

注意，先拉子模块，再安装依赖

```shell
# 初始化子模块
git submodule init

# 远程更新子模块
git submodule update --remote

# or

git submodule update --recursive --init

# https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97
```

## 开发

```shell
# 安装依赖(统一用yarn源)
# 注意要先拉取 "workspaces": ["fe-common/**/*"] 依赖项
yarn install

# 启动
yarn dev
```

## 部署

```shell
# 1.先打包 ssr
yarn build
# 生成 .next/*，需用 yarn start 启动 nodejs 服务来运行

# 2.上面步骤后会提示是否可以静态化,如果可以 ssg 就打包
yarn export
# 生成 out/*，可以直接用 ng、caddy、cos 等部署
```

## 其他

### 核心三方库

- [ethers](https://docs.ethers.io/v5/) - web3

- [bignumber.js](https://mikemcl.github.io/bignumber.js/) - bignumber

- [mobx](https://mobx.js.org/README.html)、`mobx-react-lite` - react-store

- [chakra](https://chakra-ui.com/docs/styled-system/style-props) - ui-component

- ...

### config

`config/*` 此目录下的配置文件会暴露至客户端（不安全），所以关键配置请勿放入！

```ts
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
```

修改了配置需要重启程序

...


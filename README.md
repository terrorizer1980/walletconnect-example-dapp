# WalletConnect Example Dapp

## Before you Start
This package doesn't use default dependencies, to test Trust specific features you need
to clone [WalletConnect Trust fork](https://github.com/TrustWallet/walletconnect-monorepo)
and link the packaged globally:

### Linking Dependencies
Go to the path you cloned [WalletConnect Trust fork](https://github.com/TrustWallet/walletconnect-monorepo) and type:

```bash
cd packages/core && npm install && npm run build && npm link && cd -
```

```bash
cd packages/browser && npm install && npm link @walletconnect/core && npm run build && npm link && cd -
```

Go to the directory where you clonned the example app, install the dependencies and type:

```bash
npm link @walletconnect/core && npm link @walletconnect/core
```

## Develop

```bash
yarn start
```

## Test

```bash
yarn test
```

## Build

```bash
yarn build
```

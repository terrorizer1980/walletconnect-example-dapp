import MetaMaskLogo from "../assets/metamask.svg";

declare global {
  // tslint:disable-next-line
  interface Window {
    ethereum: any;
    web3: any;
  }
}

export const web3ProvidersList = [
  {
    name: "MetaMask",
    logo: MetaMaskLogo,
    check: "isMetaMask"
  },
  {
    name: "Trust",
    logo: null,
    check: "isTrust"
  },
  {
    name: "Coinbase",
    logo: null,
    check: "isToshi"
  },
  {
    name: "Cipher",
    logo: null,
    check: "isCipher"
  },
  {
    name: "imToken",
    logo: null,
    check: "isImToken"
  },
  {
    name: "Status",
    logo: null,
    check: "isStatus"
  },
  {
    name: "Tokenary",
    logo: null,
    check: "isTokenary"
  }
];

export function checkWeb3Providers() {
  const result = {
    injectedWeb3Available: window.ethereum || window.web3
  };

  if (result.injectedWeb3Available) {
    web3ProvidersList.forEach(provider => {
      result[provider.check] =
        window.ethereum[provider.check] ||
        window.web3.currentProvider[provider.check];
    });
  }

  return result;
}

export function checkInjectedWeb3Provider() {
  let result = null;

  const web3Providers = checkWeb3Providers();

  if (web3Providers.injectedWeb3Available) {
    web3ProvidersList.forEach(provider => {
      if (web3Providers[provider.check]) {
        result = provider.name;
      }
    });
  }
  return result;
}

export function getWeb3ProviderInfo(name: string) {
  let result = null;

  const matches = web3ProvidersList.filter(provider => provider.name === name);

  if (!!matches && matches.length) {
    result = matches[0];
  }

  return result;
}

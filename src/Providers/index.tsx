import {IProviderInfo, ProviderType} from "../Components/Type";

export const METAMASK: IProviderInfo = {
  id: "injected",
  name: "MetaMask",
  logo: "../logos/portis.svg",
  type: ProviderType.INJECTED,
  check: "isMetaMask"
};

export const PORTIS: IProviderInfo = {
  id: "e918d810-942a-4516-9164-4e3ff6e0a4a1",
  name: "Portis",
  logo: "../logos/portis.svg",
  type: ProviderType.WEB,
  check: "isPortis"
};

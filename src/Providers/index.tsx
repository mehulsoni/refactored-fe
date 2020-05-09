import { IProviderInfo, ProviderType } from "../Components/Type";

export const METAMASK: IProviderInfo = {
  id: "injected",
  name: "MetaMask",
  logo: "../logos/portis.svg",
  type: ProviderType.INJECTED,
  check: "isMetaMask"
};

export const PORTIS: IProviderInfo = {
  id: "98c7eb55-068d-49e9-ba2c-640ba025ebbc",
  name: "Portis",
  logo: "../logos/portis.svg",
  type: ProviderType.WEB,
  check: "isPortis"
};

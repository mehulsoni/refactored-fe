export enum ProviderType {
    INJECTED = 'injected',
    WEB = 'web',
}
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IProviderInfo extends IProviderDisplay {
    id: string;
    type: ProviderType;
    check: string;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IProviderDisplay {
    name: string;
    logo: string;
    description?: string;
}

export interface AccountProps {
    setSelectedAction: (selectedAction: string) => void;
    account: string;
    web3Provider: any;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ISignedMessageResponse {
    auth: boolean
}

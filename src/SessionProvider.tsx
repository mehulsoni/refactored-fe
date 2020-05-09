import React, { useContext, useState } from 'react';
import { IProviderInfo, METAMASK } from './Providers';

/**
 * Session context
 */
export const SessionContext = React.createContext<
    | {
          selectedProvider: IProviderInfo | undefined;
          setSelectedProvider: (provider: IProviderInfo | undefined) => void;
          providers: IProviderInfo[] | undefined;
      }
    | undefined
>(undefined);
//

/**
 * Export guaranteed session as hook
 */
export const useSession = () => {
    return useContext(SessionContext);
};

/**
 * Provides all session info and handles initial loader / failure
 */

export const SessionProvider: React.FC = ({ children }) => {
    const [selectedProvider, setSelectedProvider] = useState<IProviderInfo>();

    const providers = [METAMASK];

    return (
        <SessionContext.Provider
            value={{
                selectedProvider,
                setSelectedProvider,
                providers,
            }}
        >
            {providers && children}
        </SessionContext.Provider>
    );
};

import { useColorMode } from '@chakra-ui/react';
import { createWeb3Modal, useWeb3ModalTheme } from '@web3modal/wagmi/react';
import React from 'react';
import { WagmiProvider } from 'wagmi';

import config from 'configs/app';
import wagmiConfig from 'lib/web3/wagmiConfig';
import colors from 'theme/foundations/colors';
import { BODY_TYPEFACE } from 'theme/foundations/typography';
import zIndices from 'theme/foundations/zIndices';

const feature = config.features.blockchainInteraction;

const init = () => {
  try {
    if (!wagmiConfig || !feature.isEnabled) {
      return;
    }

    createWeb3Modal({
      wagmiConfig,
      projectId: feature.walletConnect.projectId,
      themeVariables: {
        '--w3m-font-family': `${ BODY_TYPEFACE }, sans-serif`,
        '--w3m-accent': colors.blue[600],
        '--w3m-border-radius-master': '2px',
        '--w3m-z-index': zIndices.modal,
      },
      featuredWalletIds: [
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
        '20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66',
      ],
      allowUnsupportedChain: true,
    });
  } catch (error) {}
};

init();

interface Props {
  children: React.ReactNode;
  fallback?: JSX.Element | (() => JSX.Element);
}

const Fallback = ({ children, fallback }: Props) => {
  return typeof fallback === 'function' ? fallback() : (fallback || <>{ children }</>); // eslint-disable-line react/jsx-no-useless-fragment
};

const Provider = ({ children, fallback }: Props) => {
  const { colorMode } = useColorMode();
  const { setThemeMode } = useWeb3ModalTheme();

  React.useEffect(() => {
    setThemeMode(colorMode);
  }, [ colorMode, setThemeMode ]);

  // not really necessary, but we have to make typescript happy
  if (!wagmiConfig || !feature.isEnabled) {
    return <Fallback fallback={ fallback }>{ children }</Fallback>;
  }

  return (
    <WagmiProvider config={ wagmiConfig }>
      { children }
    </WagmiProvider>
  );
};

const Web3ModalProvider = wagmiConfig && feature.isEnabled ? Provider : Fallback;

export default Web3ModalProvider;

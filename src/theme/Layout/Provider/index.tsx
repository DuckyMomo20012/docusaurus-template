// eslint-disable-next-line import/no-extraneous-dependencies
import { useColorMode } from '@docusaurus/theme-common';
import type { ColorMode } from '@docusaurus/theme-common';
import { ColorSchemeProvider } from '@mantine/core';
import Provider from '@theme-original/Layout/Provider';
import React, { useEffect } from 'react';
import { MantineProvider } from '@site/src/context/MantineProvider';

const CustomProvider = ({ children }: { children?: React.ReactNode }) => {
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (colorMode === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode]);

  const toggleColorScheme = (colorScheme?: ColorMode) =>
    setColorMode(colorScheme || (colorMode === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorMode}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme: colorMode }}>
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default function ProviderWrapper({
  children,
  ...props
}: {
  children?: React.ReactNode;
}) {
  return (
    <Provider {...props}>
      <CustomProvider>{children}</CustomProvider>
    </Provider>
  );
}

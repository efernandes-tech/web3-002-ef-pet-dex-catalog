import { system } from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from '../ColorMode';
import { Toaster } from '../Toaster';

export function Provider(props: ColorModeProviderProps) {
    return (
        <ChakraProvider value={system}>
            <ColorModeProvider {...props} />
            <Toaster />
        </ChakraProvider>
    );
}

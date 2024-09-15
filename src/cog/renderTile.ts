import CogReader from './read/CogReader';
import { HEXColor } from './render/colorScale';
import renderColor from './render/renderColor';
import renderPhoto from './render/renderPhoto';
import renderTerrain from './render/renderTerrain';

import UPNG from 'upng-js';

export const TILE_SIZE = 256;

export const renderTile = async (
    url: string,
    z: number,
    x: number,
    y: number,
    renderMode: 'dem' | 'color' | 'photo' = 'photo',
    colorParams: string = '',
) => {
    // Read COG data
    const cog = CogReader(url);
    const metadata = await cog.getMetadata();
    const rawTile = await cog.getRawTile({ z, x, y });

    let rgba: Uint8ClampedArray;

    if (renderMode === 'dem') {
        rgba = renderTerrain(rawTile, metadata);
    } else if (renderMode === 'color') {
        const customColorsString = colorParams.match(
            /\[("#([0-9a-fA-F]{3,6})"(,(\s)?)?)+\]/,
        )?.[0];

        let colorScheme: string = '';
        let customColors: Array<HEXColor> = [];
        let minStr: string;
        let maxStr: string;
        let modifiers: string;

        if (customColorsString) {
            customColors = JSON.parse(customColorsString);

            [minStr, maxStr, modifiers] = colorParams
                .replace(`${customColorsString},`, '')
                .split(',');
        } else {
            [colorScheme, minStr, maxStr, modifiers] = colorParams.split(',');
        }

        const min = parseFloat(minStr),
            max = parseFloat(maxStr),
            isReverse = modifiers?.includes('-') || false,
            isContinuous = modifiers?.includes('c') || false;

        rgba = renderColor(rawTile, {
            ...metadata,
            colorScale: {
                colorScheme,
                customColors,
                min,
                max,
                isReverse,
                isContinuous,
            },
        });
    } else {
        // mode === 'photo'
        rgba = renderPhoto(rawTile, metadata);
    }

    return UPNG.encode([rgba.buffer], TILE_SIZE, TILE_SIZE, 0) as ArrayBuffer;
};

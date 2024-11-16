import { keySymbols } from './keySymbols';
import { keySymbolsWin } from './keySymbolsWin';

export function formatKeyString(
  keyString: string,
  isMac: boolean = true
): string {
  const symbols = isMac ? keySymbols : keySymbolsWin;
  return keyString
    .toLowerCase()
    .split('+')
    .map(key => symbols[key.trim()] || key.trim())
    .join(' ');
}

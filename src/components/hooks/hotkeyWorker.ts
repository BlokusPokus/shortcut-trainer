declare const self: Worker;

export type HotkeyWorkerData = {
  keyCombo: string;
  expectedKey: string;
  command: string;
};

export type HotkeyWorkerResponse = {
  matches: boolean;
  normalizedInput: string;
  text: string;
  status: 'found' | 'wrong';
};

const normalizeShortcut = (shortcut: string): string => {
  return shortcut.split('+').sort().join('+');
};

self.onmessage = (e: MessageEvent<HotkeyWorkerData>) => {
  const { keyCombo, expectedKey, command } = e.data;

  const normalizedInput = normalizeShortcut(keyCombo);
  const normalizedExpected = normalizeShortcut(expectedKey);
  const matches = normalizedInput === normalizedExpected;

  self.postMessage({
    matches,
    normalizedInput,
    text: `${keyCombo} - ${command}`,
    status: matches ? 'found' : 'wrong',
  });
};

export {};

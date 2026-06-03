/** Color data for the Color and Data-visualization sections.
 *
 * All hex values are taken directly from the IBM Design Language /
 * Carbon color palette so the brand reads exactly on-spec. Each hue
 * family runs from step 10 (lightest) to step 100 (darkest).
 */

export interface Swatch {
  step: string;
  hex: string;
}

/** Blue carries the brand. Blue 60 is the primary action color. */
export const BLUE_SCALE: Swatch[] = [
  { step: '100', hex: '#001141' },
  { step: '90', hex: '#001d6c' },
  { step: '80', hex: '#002d9c' },
  { step: '70', hex: '#0043ce' },
  { step: '60', hex: '#0f62fe' },
  { step: '50', hex: '#4589ff' },
  { step: '40', hex: '#78a9ff' },
  { step: '30', hex: '#a6c8ff' },
  { step: '20', hex: '#d0e2ff' },
  { step: '10', hex: '#edf5ff' },
];

export const GRAY_SCALE: Swatch[] = [
  { step: '100', hex: '#161616' },
  { step: '90', hex: '#262626' },
  { step: '80', hex: '#393939' },
  { step: '70', hex: '#525252' },
  { step: '60', hex: '#6f6f6f' },
  { step: '50', hex: '#8d8d8d' },
  { step: '40', hex: '#a8a8a8' },
  { step: '30', hex: '#c6c6c6' },
  { step: '20', hex: '#e0e0e0' },
  { step: '10', hex: '#f4f4f4' },
];

export interface PaletteFamily {
  /** Family name, e.g. "Blue". */
  name: string;
  /** Ten steps, ordered 10 (light) -> 100 (dark). */
  steps: Swatch[];
}

/**
 * The complete IBM Design Language color palette: ten hue families plus
 * three neutral grays, each in ten steps. Hex values match Carbon exactly.
 */
export const FULL_PALETTE: PaletteFamily[] = [
  {
    name: 'Blue',
    steps: [
      { step: '10', hex: '#edf5ff' },
      { step: '20', hex: '#d0e2ff' },
      { step: '30', hex: '#a6c8ff' },
      { step: '40', hex: '#78a9ff' },
      { step: '50', hex: '#4589ff' },
      { step: '60', hex: '#0f62fe' },
      { step: '70', hex: '#0043ce' },
      { step: '80', hex: '#002d9c' },
      { step: '90', hex: '#001d6c' },
      { step: '100', hex: '#001141' },
    ],
  },
  {
    name: 'Cyan',
    steps: [
      { step: '10', hex: '#e5f6ff' },
      { step: '20', hex: '#bae6ff' },
      { step: '30', hex: '#82cfff' },
      { step: '40', hex: '#33b1ff' },
      { step: '50', hex: '#1192e8' },
      { step: '60', hex: '#0072c3' },
      { step: '70', hex: '#00539a' },
      { step: '80', hex: '#003a6d' },
      { step: '90', hex: '#012749' },
      { step: '100', hex: '#061727' },
    ],
  },
  {
    name: 'Teal',
    steps: [
      { step: '10', hex: '#d9fbfb' },
      { step: '20', hex: '#9ef0f0' },
      { step: '30', hex: '#3ddbd9' },
      { step: '40', hex: '#08bdba' },
      { step: '50', hex: '#009d9a' },
      { step: '60', hex: '#007d79' },
      { step: '70', hex: '#005d5d' },
      { step: '80', hex: '#004144' },
      { step: '90', hex: '#022b30' },
      { step: '100', hex: '#081a1c' },
    ],
  },
  {
    name: 'Green',
    steps: [
      { step: '10', hex: '#defbe6' },
      { step: '20', hex: '#a7f0ba' },
      { step: '30', hex: '#6fdc8c' },
      { step: '40', hex: '#42be65' },
      { step: '50', hex: '#24a148' },
      { step: '60', hex: '#198038' },
      { step: '70', hex: '#0e6027' },
      { step: '80', hex: '#044317' },
      { step: '90', hex: '#022d0d' },
      { step: '100', hex: '#071908' },
    ],
  },
  {
    name: 'Cool gray',
    steps: [
      { step: '10', hex: '#f2f4f8' },
      { step: '20', hex: '#dde1e6' },
      { step: '30', hex: '#c1c7cd' },
      { step: '40', hex: '#a2a9b0' },
      { step: '50', hex: '#878d96' },
      { step: '60', hex: '#697077' },
      { step: '70', hex: '#4d5358' },
      { step: '80', hex: '#343a3f' },
      { step: '90', hex: '#21272a' },
      { step: '100', hex: '#121619' },
    ],
  },
  {
    name: 'Gray',
    steps: [
      { step: '10', hex: '#f4f4f4' },
      { step: '20', hex: '#e0e0e0' },
      { step: '30', hex: '#c6c6c6' },
      { step: '40', hex: '#a8a8a8' },
      { step: '50', hex: '#8d8d8d' },
      { step: '60', hex: '#6f6f6f' },
      { step: '70', hex: '#525252' },
      { step: '80', hex: '#393939' },
      { step: '90', hex: '#262626' },
      { step: '100', hex: '#161616' },
    ],
  },
  {
    name: 'Warm gray',
    steps: [
      { step: '10', hex: '#f7f3f2' },
      { step: '20', hex: '#e5e0df' },
      { step: '30', hex: '#cac5c4' },
      { step: '40', hex: '#ada8a8' },
      { step: '50', hex: '#8f8b8b' },
      { step: '60', hex: '#726e6e' },
      { step: '70', hex: '#565151' },
      { step: '80', hex: '#3c3838' },
      { step: '90', hex: '#272525' },
      { step: '100', hex: '#171414' },
    ],
  },
  {
    name: 'Red',
    steps: [
      { step: '10', hex: '#fff1f1' },
      { step: '20', hex: '#ffd7d9' },
      { step: '30', hex: '#ffb3b8' },
      { step: '40', hex: '#ff8389' },
      { step: '50', hex: '#fa4d56' },
      { step: '60', hex: '#da1e28' },
      { step: '70', hex: '#a2191f' },
      { step: '80', hex: '#750e13' },
      { step: '90', hex: '#520408' },
      { step: '100', hex: '#2d0709' },
    ],
  },
  {
    name: 'Magenta',
    steps: [
      { step: '10', hex: '#fff0f7' },
      { step: '20', hex: '#ffd6e8' },
      { step: '30', hex: '#ffafd2' },
      { step: '40', hex: '#ff7eb6' },
      { step: '50', hex: '#ee5396' },
      { step: '60', hex: '#d02670' },
      { step: '70', hex: '#9f1853' },
      { step: '80', hex: '#740937' },
      { step: '90', hex: '#510224' },
      { step: '100', hex: '#2a0a18' },
    ],
  },
  {
    name: 'Purple',
    steps: [
      { step: '10', hex: '#f6f2ff' },
      { step: '20', hex: '#e8daff' },
      { step: '30', hex: '#d4bbff' },
      { step: '40', hex: '#be95ff' },
      { step: '50', hex: '#a56eff' },
      { step: '60', hex: '#8a3ffc' },
      { step: '70', hex: '#6929c4' },
      { step: '80', hex: '#491d8b' },
      { step: '90', hex: '#31135e' },
      { step: '100', hex: '#1c0f30' },
    ],
  },
  {
    name: 'Orange',
    steps: [
      { step: '10', hex: '#fff2e8' },
      { step: '20', hex: '#ffd9be' },
      { step: '30', hex: '#ffb784' },
      { step: '40', hex: '#ff832b' },
      { step: '50', hex: '#eb6200' },
      { step: '60', hex: '#ba4e00' },
      { step: '70', hex: '#8a3800' },
      { step: '80', hex: '#5e2900' },
      { step: '90', hex: '#3e1a00' },
      { step: '100', hex: '#231000' },
    ],
  },
  {
    name: 'Yellow',
    steps: [
      { step: '10', hex: '#fcf4d6' },
      { step: '20', hex: '#fddc69' },
      { step: '30', hex: '#f1c21b' },
      { step: '40', hex: '#d2a106' },
      { step: '50', hex: '#b28600' },
      { step: '60', hex: '#8e6a00' },
      { step: '70', hex: '#684e00' },
      { step: '80', hex: '#483700' },
      { step: '90', hex: '#302400' },
      { step: '100', hex: '#1c1500' },
    ],
  },
];

export interface ColorFamily {
  label: string;
  chips: { name: string; hex: string }[];
}

/** Core families, each carrying blue, built for combination. */
export const CORE_FAMILIES: ColorFamily[] = [
  {
    label: 'Cool family — 4-colour',
    chips: [
      { name: 'Blue 60', hex: '#0f62fe' },
      { name: 'Cyan 50', hex: '#1192e8' },
      { name: 'Teal 50', hex: '#009d9a' },
      { name: 'Green 50', hex: '#24a148' },
    ],
  },
  {
    label: 'Warm family — 4-colour',
    chips: [
      { name: 'Blue 60', hex: '#0f62fe' },
      { name: 'Purple 60', hex: '#8a3ffc' },
      { name: 'Magenta 50', hex: '#ee5396' },
      { name: 'Red 50', hex: '#fa4d56' },
    ],
  },
];

/** The Carbon 14-step categorical sequence, applied strictly in order. */
export const CATEGORICAL: Swatch[] = [
  { step: '01 · Purple 70', hex: '#6929c4' },
  { step: '02 · Cyan 50', hex: '#1192e8' },
  { step: '03 · Teal 70', hex: '#005d5d' },
  { step: '04 · Magenta 70', hex: '#9f1853' },
  { step: '05 · Red 50', hex: '#fa4d56' },
  { step: '06 · Red 90', hex: '#570408' },
  { step: '07 · Green 60', hex: '#198038' },
  { step: '08 · Blue 80', hex: '#002d9c' },
  { step: '09 · Magenta 50', hex: '#ee538b' },
  { step: '10 · Yellow 50', hex: '#b28600' },
  { step: '11 · Teal 50', hex: '#009d9a' },
  { step: '12 · Cyan 90', hex: '#012749' },
  { step: '13 · Orange 70', hex: '#8a3800' },
  { step: '14 · Purple 50', hex: '#a56eff' },
];

export interface AlertColor {
  name: string;
  hex: string;
}

export const ALERTS: AlertColor[] = [
  { name: 'Error', hex: '#da1e28' },
  { name: 'Success', hex: '#24a148' },
  { name: 'Warning', hex: '#f1c21b' },
  { name: 'Caution', hex: '#ff832b' },
  { name: 'Info', hex: '#4589ff' },
];

/** Dark-theme surface layers (elevation reads without hard borders). */
export const DARK_SURFACES: { name: string; hex: string; light?: boolean }[] = [
  { name: 'Background', hex: '#161616' },
  { name: 'Layer 01', hex: '#262626' },
  { name: 'Layer 02', hex: '#393939' },
  { name: 'Layer 03', hex: '#525252' },
  { name: 'Interactive', hex: '#0f62fe', light: true },
];

import './index.css';

import { FCC } from '@/types';

type ITextComponent = {
  typography: (typeof Typography)[number];
  style?: React.CSSProperties;
  className?: string;
};

const Typography = [
  'titleDisplay',
  'titleLarge',
  'titleMedium',
  'titleSmall',
  'bodyLarge',
  'bodyRegular',
  'bodySmall',
  'labelLarge',
  'labelLarge400',
  'labelRegular',
  'labelRegular400',
  'labelSmall',
  'labelSmall400',
] as const;

export const Text: FCC<ITextComponent> = ({ typography, style, className, children }) => (
  <p style={style} className={className ? `${typography} ${className}` : typography}>
    {children}
  </p>
);

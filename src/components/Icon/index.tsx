import React from 'react';
import { SvgProps } from 'react-native-svg';

import svgs from './svgs';

export type SVGProps = SvgProps & {
  name: keyof typeof svgs;
};

export const SVG = ({ name, ...rest  }: SVGProps) => {
  const SVGIcon = svgs[name] || svgs['defaultCard'];

  return <SVGIcon {...rest} />;
};

import * as React from 'react';
import { requireNativeComponent } from 'react-native';
import extractProps, { propsAndStyles } from '../lib/extract/extractProps';
import { NumberProp } from '../lib/extract/types';
import { idPattern } from '../lib/util';
import Shape from './Shape';

export default class Use extends Shape<{
  x?: NumberProp;
  y?: NumberProp;
  width?: NumberProp;
  height?: NumberProp;
  xlinkHref?: string;
  href?: string;
}> {
  static displayName = 'Use';

  static defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  render() {
    const { props } = this;
    const {
      children,
      x,
      y,
      width,
      height,
      xlinkHref,
      href = xlinkHref,
    } = props;

    const matched = href && href.match(idPattern);
    const match = matched && matched[1];

    if (!match) {
      console.warn(
        'Invalid `href` prop for `Use` element, expected a href like "#id", but got: "' +
          href +
          '"',
      );
    }

    return (
      <RNSVGUse
        ref={this.refMethod}
        {...extractProps({ ...propsAndStyles(props), x: null, y: null }, this)}
        href={match}
        x={x}
        y={y}
        width={width}
        height={height}
      >
        {children}
      </RNSVGUse>
    );
  }
}

export const RNSVGUse = requireNativeComponent('RNSVGUse');

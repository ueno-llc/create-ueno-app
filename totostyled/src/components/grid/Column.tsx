import { AlignSelfProperty } from 'csstype';
import { math } from 'polished';
import styled, { css } from 'styled-components';
import { variables } from 'styles/variables';

interface StyledTheme {
  theme: {
    grid?: {
      gutter?: number;
    };
  };
}

interface ColumnSettings {
  width?: number;
  offset?: number | { left?: number; right?: number };
  offsetRight?: number;
  align?: AlignSelfProperty;
  gutter?: number | string;
}

interface ColumnProps extends ColumnSettings {
  sm?: number | ColumnSettings;
  md?: number | ColumnSettings;
  lg?: number | ColumnSettings;
}

function columnStyles(props: ColumnSettings & StyledTheme) {
  const offsetLeft =
    typeof props.offset === 'object' ? props.offset.left : props.offset;
  const offsetRight = Number.isSafeInteger(props.offsetRight)
    ? props.offsetRight
    : typeof props.offset === 'object' && props.offset.right;

  return css`
    align-self: ${props.align || 'stretch'};

    padding-left: ${math(`${props.gutter || variables.gutter}/2px`)};
    padding-right: ${math(`${props.gutter || variables.gutter}/2px`)};

    width: ${math(`${props.width || 1} * 100`)}%;
    margin-left: ${math(`${offsetLeft || 0} * 100`)}%;
    margin-right: ${math(`${offsetRight || 0} * 100`)}%;
  `;
}

// render media queries for (sm, md, lg, etc.)
function breakpointStyles(props) {
  const output = [];
  for (const breakpointName in variables.breakpoints) {
    if (props[breakpointName]) {
      const breakpoint = props[breakpointName];
      const breakpointProps = {
        ...props,
        ...(typeof breakpoint === 'object'
          ? breakpoint
          : { width: breakpoint }),
      };
      output.push(css`
        @media (min-width: ${variables.breakpoints[breakpointName].width}) {
          ${columnStyles(breakpointProps)}
        }
      `);
    }
  }

  return output;
}

export const Column = styled.div<ColumnProps>`
  flex: none;
  ${columnStyles}
  ${breakpointStyles}
`;

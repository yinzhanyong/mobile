import React from 'react';
import { Path, G, Svg } from 'react-native-svg';

const TicketIcon = ({ style, color, size }) => (
  <Svg style={style} viewBox="0 0 512 512" height={size} width={size}>
    <Path
      fill="none"
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth="32"
      d="M366.05 146a46.7 46.7 0 0 1-2.42-63.42a3.87 3.87 0 0 0-.22-5.26l-44.13-44.18a3.89 3.89 0 0 0-5.5 0l-70.34 70.34a23.62 23.62 0 0 0-5.71 9.24h0a23.66 23.66 0 0 1-14.95 15h0a23.7 23.7 0 0 0-9.25 5.71L33.14 313.78a3.89 3.89 0 0 0 0 5.5l44.13 44.13a3.87 3.87 0 0 0 5.26.22a46.69 46.69 0 0 1 65.84 65.84a3.87 3.87 0 0 0 .22 5.26l44.13 44.13a3.89 3.89 0 0 0 5.5 0l180.4-180.39a23.7 23.7 0 0 0 5.71-9.25h0a23.66 23.66 0 0 1 14.95-15h0a23.62 23.62 0 0 0 9.24-5.71l70.34-70.34a3.89 3.89 0 0 0 0-5.5l-44.13-44.13a3.87 3.87 0 0 0-5.26-.22a46.7 46.7 0 0 1-63.42-2.32z"
    />
    <Path
      fill="none"
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth="32"
      strokeLinecap="round"
      d="M250.5 140.44l-16.51-16.51"
    />
    <Path
      fill="none"
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth="32"
      strokeLinecap="round"
      d="M294.52 184.46l-11.01-11"
    />
    <Path
      fill="none"
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth="32"
      strokeLinecap="round"
      d="M338.54 228.49l-11-11.01"
    />
    <Path
      fill="none"
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth="32"
      strokeLinecap="round"
      d="M388.07 278.01l-16.51-16.51"
    />
  </Svg>
);
export default TicketIcon;

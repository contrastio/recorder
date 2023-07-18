import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ScreenOnlyIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 32 20" {...props}>
      <rect width="32" height="20" rx="4" fill="#2A2B2D" />
      <mask
        id="mask0_6225_56221"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="20"
      >
        <path
          d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V16C32 18.2091 30.2091 20 28 20H4C1.79086 20 0 18.2091 0 16V4Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_6225_56221)">
        <ellipse
          cx="10.2701"
          cy="6.09431"
          rx="2.28571"
          ry="2.28571"
          fill="#5B5C60"
        />
        <rect
          x="-3.44531"
          y="29.2607"
          width="32.7619"
          height="30.4762"
          rx="2"
          transform="rotate(-45 -3.44531 29.2607)"
          fill="#404145"
        />
        <rect
          x="-33.6543"
          y="23.4351"
          width="36.1113"
          height="38.715"
          rx="2"
          transform="rotate(-45 -33.6543 23.4351)"
          fill="#5B5C60"
        />
      </g>
    </SvgIcon>
  );
};

export default ScreenOnlyIcon;

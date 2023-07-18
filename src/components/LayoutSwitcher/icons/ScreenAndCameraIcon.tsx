import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ScreenAndCameraIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 31 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 0C1.79086 0 0 1.79086 0 4V16C0 18.2091 1.79086 20 4 20H19.1922C20.07 20 20.667 19.0208 20.667 18.143V14.0002C20.667 11.791 22.4579 10.0002 24.667 10.0002H29.2146C30.065 10.0002 31 9.41951 31 8.56914V4C31 1.79086 29.2091 0 27 0H4Z"
        fill="#2A2B2D"
      />
      <mask
        id="mask0_6225_56090"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="31"
        height="20"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 0C1.79086 0 0 1.79086 0 4V16C0 18.2091 1.79086 20 4 20H19.1922C20.07 20 20.667 19.0208 20.667 18.143V14.0002C20.667 11.791 22.4579 10.0002 24.667 10.0002H29.2146C30.065 10.0002 31 9.41951 31 8.56914V4C31 1.79086 29.2091 0 27 0H4Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_6225_56090)">
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
      <rect
        x="23.6191"
        y="12.8569"
        width="7.38095"
        height="7.14286"
        rx="2"
        fill="#2A2B2D"
      />
    </SvgIcon>
  );
};

export default ScreenAndCameraIcon;

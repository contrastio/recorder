import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const CameraOnlyIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 32 20" {...props}>
      <rect width="32" height="20" rx="4" fill="#2A2B2D" />
      <path
        d="M11 13.6159C11 12.2311 11.8004 10.9712 13.0539 10.3829L16 9L18.9461 10.3829C20.1996 10.9712 21 12.2311 21 13.6159V16.1429H11V13.6159Z"
        fill="#404145"
      />
      <ellipse
        cx="15.9987"
        cy="6.85714"
        rx="2.85714"
        ry="2.85714"
        fill="#5B5C60"
      />
    </SvgIcon>
  );
};

export default CameraOnlyIcon;

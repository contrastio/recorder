import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ContrastLogo = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 17 18" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1254 8.90715C16.1254 4.34671 12.5156 0.649737 8.06271 0.649735C3.6098 0.649732 6.01782e-06 4.3467 3.87675e-06 8.90714C1.73568e-06 13.4676 3.60979 17.1646 8.0627 17.1646C12.5156 17.1646 16.1254 13.4676 16.1254 8.90715ZM12.8411 8.90715C12.8411 11.6099 10.7018 13.801 8.0627 13.801C6.57506 13.801 5.2462 13.1048 4.36982 12.0131L11.0954 5.12508C12.1613 6.02263 12.8411 7.38358 12.8411 8.90715Z"
      />
    </SvgIcon>
  );
};

export default ContrastLogo;

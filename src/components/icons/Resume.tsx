import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const Resume = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 -960 960 960" {...props}>
      <path d="M240-240v-480h60v480h-60Zm174 0 385-240-385-240v480Z" />
    </SvgIcon>
  );
};

export default Resume;

type ComposeProps = {
  components: ((props: { children: React.ReactNode }) => JSX.Element)[];
  children: React.ReactNode;
};

const Compose = ({ components, children }: ComposeProps) => {
  return components.reduceRight(
    (acc, Component) => <Component>{acc}</Component>,
    children,
  );
};

export default Compose;

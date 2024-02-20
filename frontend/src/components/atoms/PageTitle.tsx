interface PageTitleProps {
  children: React.ReactNode;
}

const AtomPageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return <div className="mb-5 text-2xl font-bold">{children}</div>;
};

export default AtomPageTitle;

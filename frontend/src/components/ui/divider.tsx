interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className = '' }) => {
  return <div className={`border-t border-skin-base ${className}`} />;
};

export default Divider;

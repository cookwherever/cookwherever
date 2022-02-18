interface AlertProps {
  message?: string;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ message, className }) => {
  return (
    <div
      className={`w-full h-full py-4 px-5 text-13px md:text-sm text-skin-red font-semibold flex items-center justify-center border border-skin-red border-opacity-20 rounded ${className}`}
    >
      {message}
    </div>
  );
};

export default Alert;

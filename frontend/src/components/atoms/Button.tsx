import { Button } from "@nextui-org/button";

interface ButtonProps {
  className?: string;
  fullWidth?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

const AtomButton: React.FC<ButtonProps> = ({
  className,
  fullWidth,
  onPress,
  children,
}) => {
  return (
    <Button
      size="sm"
      className={className}
      color="primary"
      radius="sm"
      onPress={onPress}
      fullWidth={fullWidth}
    >
      {children}
    </Button>
  );
};

export default AtomButton;

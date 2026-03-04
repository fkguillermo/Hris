import "../../styles/Button.css";
import type { ButtonVariant } from "../../common/ButtonVariants.ts";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  children,
  className = "",
  ...props
}) => {
  const variantClass = `button--${variant}`; // use new base class

  return (
    <button className={`button ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
};

import "../../styles/Button.css";
import type { ButtonVariant } from "../../common/ButtonVariants.ts";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const variantClass = `button--${variant}`; // use new base class
  const sizeClass = `button--${size}`;

  return (
    <button
      className={`button ${variantClass} ${sizeClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

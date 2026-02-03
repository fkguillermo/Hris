interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "danger" | "success";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  children,
  className = "",
  ...props
}) => {
  const variantClass =
    variant !== "default" ? `action-panel__button--${variant}` : "";

  return (
    <button
      className={`action-panel__button ${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

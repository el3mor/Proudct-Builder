import { ReactNode } from "react";

interface IButtonProps {
  children: ReactNode;
  className: string;
  width?: "w-full" | "w-fit";
}

const Button = ({children, className, width="w-full", ...rest}:IButtonProps) => {
  return (
    <button className={`${width} ${className} rounded-md text-white p-2 cursor-pointer `} {...rest}>
      {children}
    </button>
  );
}

export default Button;

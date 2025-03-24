import {HTMLAttributes} from "react"

interface ICircleColorProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CircleColor = ({ color, ...rest }: ICircleColorProps) => {
  return <span className="w-5 h-5 rounded-full cursor-pointer" style={{ background: color }} {...rest} />;
};

export default CircleColor;

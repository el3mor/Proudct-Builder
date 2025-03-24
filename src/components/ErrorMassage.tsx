interface IErrorMassageProps {
  msg:string
}

const ErrorMassage = ({msg}:IErrorMassageProps) => {
  return (
    msg ? <span className="block text-red-600 text-sm font-medium">{msg}</span> : null
  );
}

export default ErrorMassage;

import { ClassicSpinnerIcon, SunflowerSpinnerIcon } from "../../assets/Icons";
import { Props } from "./Spinner.props";

export const Spinner = ({
  loading,
  absolute = true,
  spinnerClassName,
  buttonSpinner = false,
  darkColor = false,
}: Props) => {
  const className = absolute ? "absolute inset-2/4" : spinnerClassName;
  const animationClass = [
    "animate-spin-slow ",
    darkColor ? "text-custom-900" : "text-white",
    buttonSpinner ? "h-4 w-4" : "h-10 w10",
  ].join(" ");
  return loading ? (
    <div className={className}>
      {buttonSpinner ? (
        <ClassicSpinnerIcon className={animationClass} />
      ) : (
        <SunflowerSpinnerIcon className={animationClass} />
      )}
    </div>
  ) : null;
};

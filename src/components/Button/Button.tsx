import {
  baseBtnClassName,
  baseBtnSecondaryClassName,
  baseBtnTertiaryClassName,
} from "../../constants/baseClasses";
import { Spinner } from "../Spinner/Spinner";
import { Props } from "./Button.props";
import { ButtonTheme } from "./ButtonTheme";

export const Button = (props: Props) => {
  const {
    children,
    theme,
    loadingText,
    className,
    isLoading,
    disabled,
    ...rest
  } = props;
  const classNames = () => {
    let classNameString;
    switch (theme) {
      case ButtonTheme.Primary:
        classNameString = [className, baseBtnClassName, "px-5"].join(" ");
        break;
      case ButtonTheme.Secondary:
        classNameString = [className, baseBtnSecondaryClassName, "px-5"].join(
          " "
        );
        break;
      case ButtonTheme.Tertiary:
        classNameString = [className, baseBtnTertiaryClassName, "px-5"].join(
          " "
        );
        break;
    }
    return classNameString;
  };

  return (
    <button
      {...rest}
      disabled={isLoading || disabled}
      className={classNames()}
      type="button"
    >
      {isLoading ? (
        <div className="flex">
          <Spinner
            absolute={false}
            spinnerClassName="mt-1 -ml-1 mr-2"
            loading={isLoading}
            buttonSpinner={true}
            darkColor={theme === ButtonTheme.Secondary}
          />
          <span>{loadingText ? loadingText : "Sending"}</span>
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

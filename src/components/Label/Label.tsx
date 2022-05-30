import { Props } from "./Label.props";

export const Label = (props: Props) => {
  const { children, className, smallFont = true, ...rest } = props;
  const classNames = [
    `${smallFont && "text-sm font-semibold"} text-grey-600`,
    className,
  ].join(" ");

  return (
    <label className={classNames} {...rest}>
      {children}
    </label>
  );
};

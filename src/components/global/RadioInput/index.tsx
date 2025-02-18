import { useFormContext } from "react-hook-form";

type Props = {
  /**
   * The label for the radio input
   * @default ''
   * @example 'Not Started (0%)'
   * @type string
   */
  label?: string;
  /**
   * The value for the radio input
   * @default ''
   * @example 'Not Started (0%)'
   * @type string
   */
  value?: string;
  /**
   * The name for the radio input
   * @example 'status'
   * @type string
   * @required
   */
  name: string;
  /**
   * If the radio input is required
   * @default false
   * @example true
   * @type boolean
   */
  required?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const RadioInput = ({
  label,
  value,
  name,
  required = false,
  ...rest
}: Props) => {
  const { register } = useFormContext();

  return (
    <label className="flex w-full">
      <input
        className="relative mr-4 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#FF6900]"
        type="radio"
        {...rest}
        {...register(name, {
          required,
        })}
        value={label}
      />
      <span className="text-tc-main">{label}</span>
    </label>
  );
};

export default RadioInput;

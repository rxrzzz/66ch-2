import {
    SubmitHandler,
    useForm,
    UseFormProps,
    UseFormReturn,
  } from "react-hook-form";
  
  type FormProps<TFormValues> = {
    className?: string;
    onSubmit: SubmitHandler<TFormValues>;
    children: any
    options?: UseFormProps<TFormValues>; 
  };
  
  export const Form = <TFormValues extends Record<string, any>>({
    onSubmit,
    children,
    options,
    className,
  }: FormProps<TFormValues>) => {
    const methods = useForm<TFormValues>({ ...options });
    return (
      <div>
        <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
          {children(methods)}
        </form>
      </div>
    );
  };
  
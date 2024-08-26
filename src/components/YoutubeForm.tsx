import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const YoutubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit } = form;
  //   const { name, ref, onChange, onBlur } = register("username");

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };
  renderCount++;
  return (
    <div>
      <h1>YoutubeForm ({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="username"
          //   name={name}
          //   ref={ref}
          //   onChange={onChange}
          //   onBlur={onBlur}
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
        />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password")} />
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;

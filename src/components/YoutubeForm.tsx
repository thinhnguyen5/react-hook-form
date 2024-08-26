import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const YoutubeForm = () => {
  const form = useForm();
  const { register, control } = form;
  //   const { name, ref, onChange, onBlur } = register("username");

  return (
    <div>
      <form>
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="username"
          //   name={name}
          //   ref={ref}
          //   onChange={onChange}
          //   onBlur={onBlur}
          {...register("username")}
        />

        <label htmlFor="email">Email</label>
        <input type="text" id="email" {...register("email")} />

        <label htmlFor="password">Password</label>
        <input type="text" id="password" {...register("password")} />
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;

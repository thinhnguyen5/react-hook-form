import { useForm } from "react-hook-form";

const YoutubeForm = () => {
  const form = useForm();
  const { register } = form;
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
      </form>

      <button>Submit</button>
    </div>
  );
};

export default YoutubeForm;

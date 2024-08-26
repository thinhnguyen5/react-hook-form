import { useForm } from "react-hook-form";

const YoutubeForm = () => {
  const form = useForm();
  return (
    <div>
      <form>
        <label htmlFor="userName">Username</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" />

        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" />
      </form>

      <button>Submit</button>
    </div>
  );
};

export default YoutubeForm;

import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  password: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

const YoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "",
      password: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = form;
  const { errors, touchedFields, dirtyFields, isDirty, isValid } = formState;
  console.log({ touchedFields, dirtyFields, isDirty, isValid });
  //   const { name, ref, onChange, onBlur } = register("username");

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  }

  const handleGetValues = () => {
    // console.log("Get values", getValues("social.twitter"));
  };

  const handleSetValues = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    const subscription = watch((value) => {
      //console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  //   const watchUsername = watch("username")
  renderCount++;
  return (
    <div>
      <h1>YoutubeForm ({renderCount / 2})</h1>
      {/* <h2>Watched value: {watchUsername}</h2> */}

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="form-control">
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
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
              required: {
                value: true,
                message: "Username is required",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              disabled: watch("password") === "",
              required: "Enter twitter profile",
            })}
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary phone number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary phone number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div>
          <h2>List of phone numbers</h2>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}

            <button type="button" onClick={() => append({ number: "" })}>
              Add a number
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is required",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              required: {
                value: true,
                message: "Date of birth is required",
              },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        <button disabled={!isDirty || !isValid}>Submit</button>

        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>

        <button type="button" onClick={handleSetValues}>
          Set Values
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;

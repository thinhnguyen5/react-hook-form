import {
  TextField,
  Button,
  Stack,
  Alert,
  AlertTitle,
  AlertProps,
  Snackbar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useEffect, forwardRef } from "react";
import CheckIcon from "@mui/icons-material/Check";

type FormValues = {
  email: string;
  password: string;
};

const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
  function SnackbarAlert(props, ref) {
    return <Alert elevation={6} ref={ref} {...props} />;
  }
);

const MuiLoginForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitSuccessful } = formState;

  const onSubmit = (data: FormValues) => {
    setOpen(true);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={400}>
          <TextField
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password", {
              required: "Email is required",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          {/* <Alert
            severity="success"
            variant="filled"
            icon={<CheckIcon fontSize="inherit" />}
            action={
              <Button color="inherit" size="small">
                UNDO
              </Button>
            }
          >
            <AlertTitle>Success</AlertTitle>
            This is an success message
          </Alert> */}
        </Stack>
      </form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <SnackbarAlert onClose={handleClose} severity="success">
          Form submitted successfully
        </SnackbarAlert>
      </Snackbar>
    </>
  );
};

export default MuiLoginForm;

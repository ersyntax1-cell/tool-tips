import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterForm } from "../../../shared/schemas/register/register.schema";
import { useState } from "react";
import OTPVerifyModal from "../../../components/otp-verify-modal/otp-verify-modal";
import { useLoading } from "../../../hooks/loading/use-loading.hook";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { confirmOTP, onRegister, sendOTP } from "../../../shared/api/auth/auth.api";
import SubmiterButton from "../../../components/submiter-button/submiter-button";
import useAuthContext from "../../../hooks/auth-context/auth-context.hook";

export default function RegisterPage() {
  const { toggleMode, setMode } = useAuthContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [registerData, setRegisterData] = useState<RegisterForm | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { loading, startLoading, stopLoading } = useLoading();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const submit = handleSubmit(async (data: RegisterForm) => {
    startLoading();
    setErrorMessage(null);
    try {
      setRegisterData(data);
      await sendOTP(data.email);
      setIsOpen(true);
      console.log("Code sent successfully");
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.message);
    }
    finally {
      stopLoading();
    }
  });

  const handleConfirmOTP = async (otp: string) => {
    if (!registerData) return;

    startLoading();
    setErrorMessage(null);

    try {
      await confirmOTP(registerData?.email, otp);

      const data = await onRegister(registerData);
      localStorage.setItem("token", data.access_token);
      console.log("Registration successful!");
      setIsOpen(false);
      setMode('app');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to confirm OTP");
    } finally {
      stopLoading();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        component="form"
        onSubmit={submit}
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
        >
          Registration
        </Typography>

        <TextField
          label="Username"
          fullWidth
          size="small"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Email"
          fullWidth
          size="small"
          {...register("email")}
          error={!!errors.email || !!errorMessage}
          helperText={errors.email?.message || errorMessage}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          size="small"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          fullWidth
          size="small"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="body2" textAlign="center">
          Already registered?{" "}
          <span
            onClick={toggleMode}
            style={{ color: "#1976d2" }}>
            Login
          </span>
        </Typography>

        <SubmiterButton loading={loading} />
      </Paper>

      {isOpen && (
        <OTPVerifyModal
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirmOTP}
        />
      )}
    </Box>
  );
}
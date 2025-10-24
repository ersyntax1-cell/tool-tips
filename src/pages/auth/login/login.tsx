import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "../../../shared/schemas/login/login.schema";
import { onLogin } from "../../../shared/api/auth/auth.api";
import { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoading } from "../../../hooks/loading/use-loading.hook";
import SubmiterButton from "../../../components/submiter-button/submiter-button";
import useAuthContext from "../../../hooks/auth-context/auth-context.hook";

export default function LoginPage() {
    const { toggleMode, setMode } = useAuthContext();

    const { loading, startLoading, stopLoading } = useLoading();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const submit = handleSubmit(async (data: LoginForm) => {
        startLoading()
        setErrorMessage(null);

        try {
            const res = await onLogin(data);
            localStorage.setItem('token', res.access_token);
            setMode('app');
            console.log("Login successful");
        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            stopLoading();
        }
    });

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
                    Login
                </Typography>

                <TextField
                    label="Email"
                    fullWidth
                    size="small"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    size="small"
                    {...register("password")}
                    error={!!errors.password || !!errorMessage}
                    helperText={errors.password?.message || errorMessage}
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

                <Typography
                    variant="body2"
                    textAlign="center"
                >
                    Don't have an account?{" "}
                    <span
                        onClick={toggleMode}
                        style={{ color: "#1976d2" }}
                    >
                        Registration
                    </span>
                </Typography>

                <SubmiterButton loading={loading} />
            </Paper>
        </Box>
    );
}

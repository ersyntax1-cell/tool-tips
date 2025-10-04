import {
    Modal,
    Box,
    Typography,
    Button,
    TextField
} from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, type OTP } from "../../shared/schemas/otp/otp.schema";
import { useState } from "react";

interface OTPVerifyModalProps {
    onClose: () => void;
    onConfirm: (otp: string) => Promise<void>;
}

export default function OTPVerifyModal({ onClose, onConfirm }: OTPVerifyModalProps) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OTP>({
        resolver: zodResolver(otpSchema),
    });

    const onSubmit = handleSubmit(async (data: OTP) => {
        setErrorMessage(null);
        try {
            await onConfirm(data.otp);
            onClose();
        } catch (err: any) {
            setErrorMessage(err.message || "Invalid OTP code");
        }
    });

    return (
        <Modal
            open
            onClose={onClose}
            sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    width: { xs: 300, sm: 400 },
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                }}
            >
                <Typography variant="h6">OTP Verification</Typography>

                <Typography
                    variant="body2"
                    textAlign="center"
                >
                    Please enter the OTP sent to your email.
                </Typography>

                <TextField
                    label="OTP"
                    fullWidth
                    size="small"
                    {...register("otp")}
                    error={!!errors.otp || !!errorMessage}
                    helperText={errors.otp?.message || errorMessage}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                >
                    Confirm
                </Button>
            </Box>
        </Modal>
    );
}

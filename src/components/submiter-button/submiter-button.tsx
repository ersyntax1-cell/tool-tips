import { Button } from "@mui/material";
import { Icons } from "../../shared/icon/icon";

interface LoadingProp {
    loading: boolean;
}

export default function SubmiterButton({ loading }: LoadingProp) {
    return (
        <>
            <Button
                type="submit"
                disabled={loading}
                variant="contained"
                fullWidth
                sx={{ bgcolor: "#1976d2" }}
            >
                {loading ? Icons.loadingIcon : "Continue"}
            </Button>
        </>
    )
}

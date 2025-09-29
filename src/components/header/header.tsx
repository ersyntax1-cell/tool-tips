import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLinks } from "../../shared/nav-links/nav-links";

export default function Header() {
    return (
        <AppBar
            position="fixed"
            color="default"
        >
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700
                        }}
                        className="text-accent cursor-pointer inline"
                    >
                        Picsart
                    </Typography>
                </Box>

                <Box>
                    {NavLinks.map((link, index) => (
                        <Button
                            key={index}
                            color="primary"
                            sx={{ mr: 2 }}
                        >
                            {link.label}
                        </Button>
                    ))}
                </Box>

                <Box></Box>
            </Toolbar>
        </AppBar>
    )
}

import { useEffect, useState } from "react";
import { Popper, Paper, Typography, Fade, Box } from "@mui/material";
import { getSmartTips } from "../../shared/api/smart-tips/smart-tips.api";
import type { SmartTips } from "../../shared/types/smart-tips/smart-tips.types";

interface ActiveTip {
    tip: SmartTips;
    anchorEl: HTMLElement;
}

export default function SmartTipsOverlay() {
    const [tips, setTips] = useState<SmartTips[]>([]);
    const [activeTip, setActiveTip] = useState<SmartTips | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [activeTips, setActiveTips] = useState<ActiveTip[]>([]);



    useEffect(() => {
        async function fetchTips() {
            try {
                const data = await getSmartTips();
                setTips(data);
            } catch (err) {
                console.error("Failed to load Smart Tips", err);
            }
        }
        fetchTips();
    }, []);

    useEffect(() => {
        const listeners: { el: HTMLElement; enter: any; leave: any }[] = [];

        const timer = setTimeout(() => {
            tips.forEach((tip) => {
                const element = document.querySelector<HTMLElement>(tip.selector);
                if (!element) return;

                const handleMouseEnter = () => {
                    setActiveTips((prev) => [...prev, { tip, anchorEl: element }]);
                };

                const handleMouseLeave = () => {
                    setActiveTips((prev) => prev.filter((t) => t.anchorEl !== element));
                };

                element.addEventListener("mouseenter", handleMouseEnter);
                element.addEventListener("mouseleave", handleMouseLeave);

                listeners.push({ el: element, enter: handleMouseEnter, leave: handleMouseLeave });
            });
        }, 200);

        return () => {
            listeners.forEach(({ el, enter, leave }) => {
                el.removeEventListener("mouseenter", enter);
                el.removeEventListener("mouseleave", leave);
            });
            clearTimeout(timer);
        };
    }, [tips]);



    return (
        <>
            {activeTips.map(({ tip, anchorEl }) => (
                <Popper
                    key={tip._id}
                    open={true}
                    anchorEl={anchorEl}
                    placement="bottom"
                    transition
                    modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={200}>
                            <Paper sx={{
                                p: 1.5,
                                maxWidth: 430,
                                boxShadow: 3,
                                borderRadius: 1,
                                display: 'flex',
                                gap: 1
                            }}>
                                {tip.image && (
                                    <img
                                        src={`http://localhost:3000${tip.image}`}
                                        alt={tip.title}
                                        style={{ width: 60, height: 60, marginTop: 6, borderRadius: 4 }}
                                    />
                                )}

                                <Box >
                                    <Typography
                                        variant="h6"
                                        sx={{ color: "text.secondary", fontSize: 17, fontWeight: 600 }}
                                    >
                                        {tip.title}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            maxWidth: 300,
                                            overflow: "hidden",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            color: "text.secondary",
                                            lineHeight: 1.4,
                                            pl: 1
                                        }}
                                    >
                                        {tip.description}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            ))}
        </>
    );

}

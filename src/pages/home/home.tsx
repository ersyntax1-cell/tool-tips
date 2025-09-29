import SmartTipsSidebar from "../../components/smart-tips-sidebar/smart-tips-sidebar";
import { useSmartTipsSidebarStore } from "../../store/smart-tips-sidebar/smart-tips-sidebar.store";

export default function Home() {
    const open = useSmartTipsSidebarStore((state) => state.open);
    const toggleDrawer = useSmartTipsSidebarStore((state) => state.toggle);

    return (
        <div className="Home">
            <SmartTipsSidebar open={open} toggleDrawer={toggleDrawer} />

            <div className="section w-full h-screen
            flex flex-col justify-center items-center gap-1">
                <h1 className="text-[120px]
                bg-gradient-to-r from-[#682a9b] via-[#c757c1] to-[#0d0c04] bg-clip-text text-transparent">
                    Supercharge
                </h1>

                <p className="text-center w-1/2 text-text">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti ex incidunt magni fuga saepe deleniti est quos laboriosam ad nobis.
                </p>

                <button className="bg-accent hover:bg-accent-hover cursor-pointer text-white
                rounded-full py-2 px-4 mt-2">
                    Get started
                </button>
            </div>
        </div>
    )
}

import { useEffect, useState } from "react";
import SmartTipsSidebar from "../../components/smart-tips-sidebar/smart-tips-sidebar";
import ToursComponent from "../../components/tours/tours";
import { useSmartTipsSidebarStore } from "../../store/smart-tips-sidebar/smart-tips-sidebar.store";
import { getSmartTips, removeSmartTip } from "../../shared/api/smart-tips/smart-tips.api";
import type { TourItemProps } from "../../shared/types/tour-item/tour-item.type";

export default function Home() {
  const open = useSmartTipsSidebarStore((state) => state.open);
  const toggleDrawer = useSmartTipsSidebarStore((state) => state.toggle);

  const [data, setData] = useState<TourItemProps[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      const tips = await getSmartTips();
      setData(tips);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await removeSmartTip(id);
      setData((prev) => prev.filter((tip) => tip._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Home pt-[70px]">
      <SmartTipsSidebar open={open} toggleDrawer={toggleDrawer} refreshTips={fetchTips} />
      <ToursComponent data={data} onDelete={handleDelete} />
    </div>
  );
}

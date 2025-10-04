import TourItem from "../tour-item/tour-item";
import type { TourItemProps } from "../../shared/types/tour-item/tour-item.type";

interface Props {
  data: TourItemProps[];
  onDelete: (id: string) => void;
}

export default function ToursComponent({ data, onDelete }: Props) {
  return (
    <div className="m-6">
      {data && data.map((item) => (
        <TourItem key={item._id} data={item} onDelete={onDelete} />
      ))}
    </div>
  );
}

interface Item {
    id: string,
    label: string;
    onClick: () => void;

}export const DashboardItems: Item[] = [
  {
    id: "tooltip",
    label: "ToolTip",
    onClick: () => {},
  },
  {
    id: "other",
    label: "Other Action",
    onClick: () => alert("Other action clicked!"),
  },
];
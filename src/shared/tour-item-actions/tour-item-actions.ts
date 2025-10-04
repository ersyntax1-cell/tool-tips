import { removeSmartTip } from "../api/smart-tips/smart-tips.api";
import { Icons } from "../icon/icon";


export const TourItemActions = [
    {
        action: 'edit',
        element: Icons.editIcon,
        handler: () => console.log('edit clicked'),
    },
    {
        action: 'delete',
        element: Icons.trashIcon,
        handler: async (data: any) => {
            try {
                await removeSmartTip(data._id);
            } catch (error: any) {
                console.error(error);
            }
        },
    },
]
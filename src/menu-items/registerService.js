// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill,IconNotebook,IconListCheck  ,IconTextWrapDisabled,IconBrandAsana  } from '@tabler/icons';

 
// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconNotebook,
    IconListCheck,
    IconTextWrapDisabled,
    IconBrandAsana 
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const registerService = {
    id: 'registerService',
    title: 'Quản lý tài nguyên',
    type: 'group',
    children: [
        {
            id: 'mysubscription',
            title: 'Tài nguyên sử dụng',
            type: 'item',
            url: '/mysubscription',
            icon: icons.IconListCheck,
            breadcrumbs: true
        },
        {
            id: 'manage-user',
            title: 'Quản lý tài khoản',
            type: 'item',
            url: '/manageuser',
            icon: icons.IconBrandAsana,
            breadcrumbs: true
        },
        {
            id: 'regsubscription',
            title: 'Đăng ký tài nguyên',
            type: 'item',
            url: '/registerservice',
            icon: icons.IconTextWrapDisabled,
            breadcrumbs: true
        }
    ]
};

export default registerService;
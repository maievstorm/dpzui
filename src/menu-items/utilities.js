// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill,IconNotebook } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconNotebook
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Công Cụ',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Học máy',
            type: 'item',
            url: 'http://jupyterhub-fis-mbf-dplat.apps.xplat.fis.com.vn',
            icon: icons.IconNotebook,
            external: true,
            target: true
        },
        {
            id: 'util-color',
            title: 'Truy vấn',
            type: 'item',
            url: 'https://dpabeaver.apps.xplat.fis.com.vn',
            icon: icons.IconPalette,
            external: true,
            target: true
        },
        {
            id: 'util-shadow',
            title: 'Dragonfly',
            type: 'item',
            url: '/dragonfly',
            icon: icons.IconShadow,
            breadcrumbs: false
        },
        // {
        //     id: 'icons',
        //     title: 'Icons',
        //     type: 'collapse',
        //     icon: icons.IconWindmill,
        //     children: [
        //         {
        //             id: 'tabler-icons',
        //             title: 'Tabler Icons',
        //             type: 'item',
        //             url: '/icons/tabler-icons',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'material-icons',
        //             title: 'Material Icons',
        //             type: 'item',
        //             url: '/icons/material-icons',
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default utilities;

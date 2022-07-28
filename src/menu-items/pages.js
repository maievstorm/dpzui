// assets
import { IconKey,IconTypography,IconBrandCodepen,IconDatabaseImport,IconCloud,IconDiamond } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconTypography,
    IconBrandCodepen,
    IconDatabaseImport,
    IconCloud,
    IconDiamond
    
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Dịch Vụ',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'dataservice',
            title: 'Khai thác',
            type: 'collapse',
            icon: icons.IconDiamond,

            children: [
                {
                    id: 'dataai',
                    title: 'Khoa học dữ liệu',
                    type: 'item',
                    url: '/dataai',
                    breadcrumbs: true
                },
                {
                    id: 'finnacereport',
                    title: 'Xây dựng BCTC',
                    type: 'item',
                    url: '/financereport',
                    breadcrumbs: true
                }
                ,
                {
                    id: 'datavisualize',
                    title: 'Trực quan dữ liệu',
                    type: 'item',
                    url: '/datavisual',
                    breadcrumbs: true
                }
            ]
        }, 
        {
            id: 'dataingest',
            title: 'Tích hợp',
            type: 'collapse',
            icon: icons.IconDatabaseImport,

            children: [
                {
                    id: 'dataingest',
                    title: 'Lưu chuyển dữ liệu',
                    type: 'item',
                    url: '/dataingest',
                    breadcrumbs: true
                },
                {
                    id: 'datastreaming',
                    title: 'Truyền tải trực tiếp',
                    type: 'item',
                    url: '/datastream',
                    breadcrumbs: true
                }
                ,
                {
                    id: 'databackup',
                    title: 'Sao lưu',
                    type: 'item',
                    url: '/databackup',
                    breadcrumbs: true
                }
            ]
        }
        ,
         {
            id: 'dataplatform',
            title: 'Nền tảng',
            type: 'collapse',
            icon: icons.IconCloud,

            children: [
                {
                    id: 'objectstorage',
                    title: 'Lưu trữ đám mây',
                    type: 'item',
                    url: '/ojectstorage',
                    breadcrumbs: true
                },
                {
                    id: 'datawarehouse',
                    title: 'Kho dữ liệu',
                    type: 'item',
                    url: '/datawh',
                    breadcrumbs: true
                }
                ,
                {
                    id: 'bigdata',
                    title: 'Dữ liệu lớn',
                    type: 'item',
                    url: '/bigdata',
                    breadcrumbs: true
                }
            ]
        }
        
    ]
};

export default pages;

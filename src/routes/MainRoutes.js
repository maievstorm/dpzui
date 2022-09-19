import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Documents from 'views/document/Documents';



// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Bigdatapage = Loadable(lazy(() => import('views/bigdata')));
const Datawhpage = Loadable(lazy(() => import('views/datawh')));
const Objectstorepage = Loadable(lazy(() => import('views/objectstore')));
const Dataingestpage = Loadable(lazy(() => import('views/dataingest')));
const Datastreampage = Loadable(lazy(() => import('views/datastream')));
const Databackuppage = Loadable(lazy(() => import('views/databackup')));
const CreateBackup = Loadable(lazy(() => import('views/databackup/CreateBackup')));

const Dataaipage = Loadable(lazy(() => import('views/dataai')));
const Financereportpage = Loadable(lazy(() => import('views/financereport')));
const Datavisualpage = Loadable(lazy(() => import('views/datavisual')));
const Dragonflypage = Loadable(lazy(() => import('views/dragonfly')));
//const MonitorJob = Loadable(lazy(() => import('views/dataingest/MonitorJob')));
const CreateflowJob = Loadable(lazy(() => import('views/dataingest/CreateNewFlow')));
const EditFlowJob = Loadable(lazy(() => import('views/dataingest/EditFlowJob')));

//const UploadStorage = Loadable(lazy(() => import('views/objectstore/UploadStorage')));
const UploadMultiFiles = Loadable(lazy(() => import('views/objectstore/UploadMultiFiles')));
//const ManageDpaStorage = Loadable(lazy(() => import('views/DpaStorage/ManageDpaStorage')));
const RegisterStreaming = Loadable(lazy(() => import('views/datastream/RegisterStream')));
const AdminPage = Loadable(lazy(() => import('views/admin')));
const RegisterService = Loadable(lazy(() => import('views/registerservice')));
const LogInfo = Loadable(lazy(() => import('views/dataingest/LogInfo')));
const Logdetail = Loadable(lazy(() => import('views/dataingest/Logdetail'))); 
const OrderDetail = Loadable(lazy(() => import('views/registerservice/OfferDetail'))); 
const Mysubscription = Loadable(lazy(() => import('views/registerservice/Mysubscription'))); 
const DagGraph = Loadable(lazy(() => import('views/dataingest/DagGraph'))); 
const Thanks = Loadable(lazy(() => import('views/registerservice/Thanks'))); 
const Songcheck = Loadable(lazy(() => import('views/dragonfly/Songcheck'))); 
const ReviewSubscription = Loadable(lazy(() => import('views/admin/ReviewSubscription'))); 
const ManageUser = Loadable(lazy(() => import('views/manageuser'))); 
const Singtosong = Loadable(lazy(() => import('views/dragonfly/singtosong'))); 
 
 
 
 








// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        }
        ,
        {
            path: '/bigdata',
            element: <Bigdatapage />
        }
        ,
        {
            path: '/datawh',
            element: <Datawhpage />
        }
        ,
        {
            path: '/ojectstorage',
            element: <Objectstorepage />
        }
        ,
        {
            path: '/dataingest',
            element: <Dataingestpage />
        }
        ,
        {
            path: '/datastream',
            element: <Datastreampage />
        }
        ,
        {
            path: '/databackup',
            element: <Databackuppage />
        },
        {
            path: '/databackup/createbackup',
            element: <CreateBackup />
        } ,
        ,
        {
            path: '/dataai',
            element: <Dataaipage />
        }
        ,
        {
            path: '/financereport',
            element: <Financereportpage />
        }
        ,
        {
            path: '/datavisual',
            element: <Datavisualpage />
        }
        ,
        {
            path: '/dragonfly',
            element: <Dragonflypage />
        }
        ,
        {
            path: '/dataingest/createflowjob',
            element: <CreateflowJob />
        },
        {
            path: '/dataingest/daggraph',
            element: <DagGraph />
        },
        {
            path: '/dataingest/editflowjob/:jobid',
            element: <EditFlowJob />
        },
        {
            path: '/dataingest/loginformation/logdagdetail',
            element: <Logdetail />
        },
        // {
        //     path: '/dataingest/loginformation/:dagid/dagRuns/:logid',
        //     element: <Logdetail />
        // },
        {
            path: '/dataingest/loginformation/:dagid',
            element: <LogInfo />
        },
        {
            path: '/objectstore/uploadmultifile',
            element: <UploadMultiFiles />
        },
        {

            path: '/datastream/registerstream',
            element: <RegisterStreaming />
        },
        {

            path: '/admin/admindpz',
            element: <AdminPage />
        },
        {
            path: '/registerservice',
            element: <RegisterService />
        }
        ,
        {
            path: '/registerservice/offerdetail/:product',
            element: <OrderDetail />
        },
        {
            path: '/mysubscription',
            element: <Mysubscription />
        },
        {
            path: '/manageuser',
            element: <ManageUser />
        }
        ,
        {
            path: '/documents',
            element: <Documents />
        }
        ,
        {
            path: '/thanks',
            element: <Thanks />
        }
        ,
        {
            path: '/dragonfly/songcheck',
            element: <Songcheck />
        },
        {
            path: '/dragonfly/singtosong',
            element: <Singtosong />
        }
               ,
        {
            path: '/admin/admindpz/reviewsubcription',
            element: <ReviewSubscription />
        }
        
    ]
};

export default MainRoutes;

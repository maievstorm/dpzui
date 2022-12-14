import React from "react";
import RenderOnRole from "components/RenderOnRole";
import ManageSubscription from "./ManageSubscription";


// ==============================|| Bigdata Page ||============================== //

const AdminPage = () => (

    <div>
      
        <RenderOnRole roles={['Admin']}>
            <ManageSubscription/>
           
        </RenderOnRole>

    </div>

);

export default AdminPage;

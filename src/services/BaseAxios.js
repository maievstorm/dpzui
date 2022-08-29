import axios from 'axios';
export default axios.create({
//  baseURL: 'http://localhost:3000/api/v1',
  baseURL: 'https://dpaapigw.apps.xplat.fis.com.vn/dpzapipub/api/v1',
  // withCredentials: true 
 
});
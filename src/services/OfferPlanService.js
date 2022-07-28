import BaseAxios from "./BaseAxios";
import UserService from "./UserService";



const applyService = async (data) => {
  try {
    await BaseAxios({
      method: 'post',
      url: '/requestsub',
      data: data,
      headers: { "Authorization": `Bearer ${UserService.getToken()}` }
    });
  } catch (err) {
    console.log(err);
  }
}



const getMyreqest = async () => {
  let response
  try {
    response = await BaseAxios({
      method: 'get',
      url: '/requestsub/reqsubbyusername/' + UserService.getUsername(),
      headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    });
  } catch (err) {
    console.log(err);
  }
  return response
}

const getMyresourceusage = async () => {
  let response
  try {
    response = await BaseAxios({
      method: 'get',
      url: '/requestsub/resourceusageusername/aggregateResource',
      params: {
        userName: UserService.getUsername()
      },
      headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    });
  } catch (err) {
    console.log(err);
  }
  return response
}

const getOffer = async () => {
  let response
  try {
    response = await BaseAxios({
      method: 'get',
      url: '/prerequisite/offerandplan',
      headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    });
  } catch (err) {
    console.log(err);
  }
  return response
}

const getUserinfo = async () => {
  let response
  try {
    response = await BaseAxios({
      method: 'get',
      url: '/useraccount/accountbyusername/' + UserService.getUsername(),
      headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    });
  } catch (err) {
    console.log(err);
  }
  return response
}

export const changeRequestStatus = async (id, status) => {
  let response
  try {
    response = await BaseAxios({
      method: 'put',
      url: `requestsub/${id}`,
      data: {
        request_status: status,
        approve_user: UserService.getUsername()
      },
      headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    });
  } catch (err) {
    console.log(err);
  }
  return response
}



const OfferPlanService = {
  applyService,
  getOffer,
  getUserinfo,
  getMyreqest,
  getMyresourceusage



};

export default OfferPlanService;
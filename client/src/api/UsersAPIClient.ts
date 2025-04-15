import { GeneralStatics, User, UserTypes } from '@/components/Dashboard/types';
import { APIRequestResult, useBaseApiClient } from './BaseAPIClient';

type UsersAPIClient = {
    list: (filter?: string) => Promise<APIRequestResult<Array<User>>>;
    getGeneralStatics: () => Promise<APIRequestResult<GeneralStatics>>;
  getUserTypes: () => Promise<APIRequestResult<UserTypes>>;
  deleteUser: (id: number) => Promise<APIRequestResult<void>>;
  updateUser: (id: number, body: User) => Promise<APIRequestResult<User>>;
  createUser: ( body: User) => Promise<APIRequestResult<User>>;



};

export const useUserAPIClient = (): UsersAPIClient => {
  const { getRequest, delRequest, putRequest,postRequest } = useBaseApiClient();

  const list = (filter?: string) => {
    let url = 'users';
    if (filter) {
      url = `${url}?q=${encodeURIComponent(filter)}`;
    }

    return getRequest<User[]>(url);
  };

    const getGeneralStatics = () => {
      const url = 'statics'
      return getRequest<GeneralStatics>(url);
    };
    
    const getUserTypes = () => {
        const url = '/userTypes'
      return getRequest<UserTypes>(url);
  }
  
const deleteUser = (id: number): Promise<APIRequestResult<void>> => {
    return delRequest(`users/${id}`);
  };

  const updateUser = ( id: number,user: User): Promise<APIRequestResult<User>> => {

    return putRequest<User>(`users/${id}`, user);
  };

   const createUser = (user: User): Promise<APIRequestResult<User>> => {

    return postRequest<User>(`users`, user);
  };


  return {
      list,
      getGeneralStatics,
    getUserTypes,
    deleteUser,
    updateUser,
    createUser
  };
};

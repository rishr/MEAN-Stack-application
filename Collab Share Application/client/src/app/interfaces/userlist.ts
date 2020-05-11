/**
 * Interface for all user related response data received from REST API
 */
export interface UserList {
    _id: string;
    firstName: string;
    lastName: number;
    password: string;
    contactNumber: number;
    emailAddress: string;
    userName: string;
    profession: string;
    image: string;
  }

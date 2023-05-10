declare module "userTypes" {
  export type TypeUser = {
    user_id: number;
    email?: string;
    nickname?: string;
    address?: string;
    score?: int;
    profile_image?: any;
    background_image?: any;
    isSaved?: boolean;
    login_method: string;
    isLogged: boolean;
    access_token?: string;
    refresh_token?: string;
  };

  export type TypeProfile = {
    user_id: number;
    email: string;
    nickname: string;
    user_address: string;
    score: int;
    login_method: string;
    password_key: string;
    image_id_profile: string;
    image_id_background: string;
  };
}

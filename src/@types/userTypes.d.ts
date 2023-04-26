declare module "userTypes" {
  type TypeUser = {
    user_id: number;
    email: string;
    isSaved: boolean;
    login_method: string;
    isLogged: boolean;
  };
}

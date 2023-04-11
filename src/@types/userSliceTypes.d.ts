declare module "mainPageTypes" {
  type TypeUser = {
    user: {
      user_id: number;
      email: string;
      isSaved: boolean;
      login_method: string;
      isLogged: boolean;
    };
  };
}

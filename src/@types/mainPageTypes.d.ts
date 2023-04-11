declare module "mainPageTypes" {
  export type TypeMeetingList = {
    meet_id: number;
    title: string;
    maximum_participants: number;
    registered_participants_count: number;
    address: string;
    deadline: string;
    date: string;
    category: string;
    like?: boolean;
  };

  export type TypeMeetingData = {
    title: string;
    list: TypeMeetingList[];
  };
}

declare module "mainPageTypes" {
  export type TypeMeetingList = {
    meet_id: number;
    title: string;
    sub_title?: string;
    content?: string;
    hits_count?: number;
    date_created?: string;
    writer?: string;
    maximum_participants: number;
    registered_participants_count: number;
    address: string;
    deadline: string;
    date: string;
    category: { key: string[] };
    like?: boolean;
  };

  export type TypeMeetingData = {
    title: string;
    list: TypeMeetingList[];
  };

  export type TypeModalState = {
    isOpen: boolean;
    modalType: string;
    modalContent?: TypeMeetingList | null;
  };
}

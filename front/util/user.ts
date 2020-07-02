export interface BookMarkType {
    id: number,
    uuid: string,
    title: string,
    scategory: string,
    view: number,
    createdAt: string,
    titles: string[],
    key: string | null, 
};

export interface MeType {
    nickname: string, 
    admin: boolean, 
    BookMarked: BookMarkType[],
};

export interface SignupData {
    userId: string,
    nickname: string,
    password: string,
};

export interface LoginData {
    userId: string,
    password: string,
};
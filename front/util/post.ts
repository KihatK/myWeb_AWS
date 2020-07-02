export interface UserType {
    nickname: string,
};

export interface CommentData {
    content: string,
    User: UserType,
    createdAt: string,
};

export interface Post {
    id: number,
    uuid: string,
    title: string,
    content: string,
    scategory: string,
    view: number,
    User: UserType,
    Comments: CommentData[],
    createdAt: string,
    updatedAt: string,
};

export interface AddCommentData {
    comment: string,
    postId: string,
};

export interface AddPostData {
    title: string,
    nickname: string,
    content: string,
    scategory: string,
    language: string,
};

export interface EditPostData extends AddPostData {
    uuid: string,
};
import { Post } from './post';
import { BcategoryType } from './category';

export interface PostProps {
    post: Post;
};

export interface CategoryDrawerProps {
    visible: boolean;
    onClose: () => void;
};

export interface CategoryListProps {
    category: BcategoryType,
};
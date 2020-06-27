import User, { associate as associateUser } from './user';
import Post, { associate as associatePost } from './post';
import Image, { associate as associateImage } from './image';
import Comment, { associate as associateComment } from './comment';
import Bcategory, { associate as associateBcategory } from './bcategory';
import Scategory, { associate as associateScategory } from './scategory';

export * from './sequelize';  //for connecting database

const db = {
    User,
    Post,
    Image,
    Comment,
    Bcategory,
    Scategory,
};

export type dbType = typeof db;

associateUser(db);
associatePost(db);
associateImage(db);
associateComment(db);
associateBcategory(db);
associateScategory(db);
export interface ScategoriesType {
    name: string,
};

export interface BcategoryType {
    name: string,
    Scategories: ScategoriesType[],
}

export interface ScategoryListType {
    name: string,
};

export interface ChangeBcategoryOrder {
    bcategory1: string,
    bcategory2: string,
}
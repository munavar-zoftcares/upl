

export interface Category {
  id?: number;
  categoryName: string;
  description?: string;
  parentId?:string;
}

export let categories: Category[] = [];

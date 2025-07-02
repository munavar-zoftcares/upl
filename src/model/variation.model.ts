
interface variation {
     name:string;
     data:string[]
}
export interface variations {
  id: number;
  categoryId:string;
  variations:variation[]
}

export let categories: variation[] = [];
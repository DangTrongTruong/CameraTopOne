export interface IProduct{
    _id: string,
    category: string,
    createdAt:Date,
    Stock:number,
    url:string,
    description:string,
    images:string[],
    name:string,
    numOfReviews:number,
    price:number,
    rating:number,
    ratings:number,
    review:any,
    reviews:number[],
}

export interface IReviews{
    user:string,
    name:string,
    rating:number,
    comment:string,
    index:any,
    _id:string,
    key:any,
}

export interface getAllProductType{
    keyword:string,
    price:number[],
    category:string,
    ratings:number
  }

  export interface getProductDetailType{
    keyword:string,
    price:number,
    category:string,
    rating:number
  }

  export interface productState {
    error: String,
    loading: boolean,
    products:[],
    productCount:number,
    success: boolean,
    message: string,
  }


  export interface Props{
    user:any
  }

  export interface idParams{
    id:any,
   
  }

  export interface dataFormReview{
    rating:any,
    comment:string,
    productId:any,
    token:string,
  }
  export interface dataFormProductList{
    keyword:string,
    price:number,
    category:any
    ratings:number
  }


import instance from "./instance"

export const getAllProductApi = (data) =>{
    const {keyword,category,price,ratings} = data
    
    if(category){
        const url = `/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        return instance.get(url)
    }
    if(keyword || price || ratings){
        const url = `/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        return instance.get(url)
    }
    
    const url = `/products`
    return instance.get(url)
}

export const getProductDetail = (id) =>{
    const url = `/product/${id}`
    return instance.get(url)
}

export const getProducts = () =>{
    const url = `/products`
    return instance.get(url)
}
export const createReview = (data) =>{
    const url = `/review`
    return instance.put(url,data)
}

export const createProductApi = (data) =>{
    const url = `/product/new`
    return instance.post(url,data)
}

export const updateProductApi = (dataForm) =>{
    const {productId,myForm} = dataForm
    const url = `/product/${productId.id}`
    return instance.put(url,myForm)
}

export const removeProductApi = (dataForm) =>{
    const {id,token} = dataForm
    console.log("token",token);
    console.log("id",id);

    const url = `/product/${id}`
    return instance.post(url,token)
}

export const getAllReviewsApi = (id) =>{
    const url = `/reviews?id=${id}`
    return instance.get(url)
}


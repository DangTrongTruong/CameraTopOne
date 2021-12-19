import instance from "./instance"

export const createOrderApi = (data) =>{
    const url = `/order/new`
    return instance.post(url,data)
}

export const getMyOrderApi = (token) =>{
    const url = `/orders/me`
    return instance.post(url,{token})
}

export const getAllOrderApi = (token) =>{
    const url = `admin/orders`
    return instance.post(url,{token})
}

export const getOrderDetailApi = (data) =>{
    const {id,token} = data
    const url = `/order/${id}`
    return instance.post(url,{token})
}

export const updateStatusOrderApi = (data) =>{
    const {id,token,email,status} = data
    const url = `/admin/order/${id}`
    return instance.patch(url,{token,email,status})
}



import instance from "./instance"

export const loginApi = (data)=>{
    const url ="/login"
    return instance.post(url,data)
}

export const logoutApi = ()=>{
    const url ="/logout"
    return instance.get(url)
}

export const signupApi = (data)=>{
    const url ="/register"
    return instance.post(url,data)
}

export const loaderUserApi = ()=>{
    const url ="/me"
    return instance.post(url)
}

export const updateProfileApi = (data)=>{
    const url ="/me/update"
    return instance.put(url,data)
}

export const updatePasswordApi = (data)=>{
    const url ="/password/update"
    return instance.put(url,data)
}

export const forgotPasswordApi = (email)=>{
    const url ="/password/forgot"
    return instance.post(url,email)
}

export const resetPasswordApi = (data)=>{
    const {token,myForm} = data
    const url =`/password/reset/${token}`
    return instance.put(url,myForm)
}

export const getAllUsersApi = (token)=>{
    const url =`/admin/users`
    return instance.post(url,token)
}

export const getUserApi = (data)=>{
    const {token,id} = data
    const url =`/admin/user/${id}`
    return instance.post(url,token)
}

export const deleteUsersApi = (data)=>{
    const {token,id} = data
    const url =`/admin/user/${id}`
    return instance.post(url,token )
}

export const updateUsersApi = (data)=>{
    const {dataForm,id} = data
    const url =`/admin/user/${id}`
    return instance.put(url,dataForm)
}
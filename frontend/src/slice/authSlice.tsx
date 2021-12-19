import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, logoutApi, signupApi ,loaderUserApi,updateProfileApi,getUserApi ,updatePasswordApi,forgotPasswordApi,resetPasswordApi,getAllUsersApi,deleteUsersApi, updateUsersApi} from "../api/user";
export interface loginUser{
    email: string;
    password: string;
}
// tạo và export action để call api product
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (dataForm:loginUser) => {
    const { data } = await loginApi(dataForm)
    return data;
  }
  );

// tạo và export action để call api product
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    const { data } = await logoutApi()
    return data;
  }
  );

// tạo và export action để call api product
export interface signUpUser{
  email: string;
  password: string;
  name:string
}
export const registerUser:any = createAsyncThunk(
  // type action
  "auth/registerUser",
  async (dataForm:signUpUser) => {
    const { data } = await signupApi(dataForm)
    return data;
  }
  );

  //loader user
  // tạo và export action để call api product
  export const loader = createAsyncThunk(
  "auth/loader",
  async () => {
    const { data } = await loaderUserApi()
    return data;
  }
  );

  //updateProfile
  export const updateProfileUser:any = createAsyncThunk(
    "auth/updateProfileUser",
    async (dataForm:signUpUser) => {
      const { data } = await updateProfileApi(dataForm)
      return data;
    }
    );

  //updateProfile
  export const updatePassword:any = createAsyncThunk(
    "auth/updatePassword",
    async (dataForm) => {
      const { data } = await updatePasswordApi(dataForm)
      return data;
    }
    );


  //forgotPassword
  export const forgotPassword:any = createAsyncThunk(
    "auth/forgotPassword",
    async (email) => {
      const { data } = await forgotPasswordApi(email)
      return data;
    }
    );

  //resetPassword
  
  export const resetPassword:any = createAsyncThunk(
    "auth/resetPassword",
    async (dataForm) => {
      const { data } = await resetPasswordApi(dataForm)
      return data;
    }
    );

  //getAllUsers
  type datagetAllUsers ={
    tokem:string,
  }
  export const getAllUsers:any = createAsyncThunk(
    "auth/getAllUsers",
    async (token:string) => {
      const { data } = await getAllUsersApi(token)
      return data;
    }
    );

    //getUser
  
  export const getUser:any = createAsyncThunk(
    "auth/getUser",
    async (token:string) => {
      const { data } = await getUserApi(token)
      return data;
    }
    );

    //deleteUser
    export const deleteUser:any = createAsyncThunk(
      "auth/deleteUser",
      async (dataForm) => {
        const { data } = await deleteUsersApi(dataForm)
        return data;
      }
      );

     //updateUser
  
  export const updateUser:any = createAsyncThunk(
    "auth/updateUser",
    async (dataForm) => {
      const { data } = await updateUsersApi(dataForm)
      return data;
    }
    );
  
const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: "",
    loading: false,
    isAuthenticated:false,
    user:{},
    message:"",
    success:false,
    token:"",
    listUser:[],
    userUpdate:{},
  },
  reducers:{
    clearError: (state,action)=>{

      state.error =action.payload;
  }
  },
  extraReducers: (builder) => { 

    //login
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = false;
      state.isAuthenticated =false;
      state.error = ""
    });
    builder.addCase(loginUser.rejected, (state,action) => {
      state.loading = false;
      state.isAuthenticated =false;
      state.user={};
      state.error = "Login Fail"
    });

    //logout
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.token="";
      
    });

    //signup
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isAuthenticated = false;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error="SignUp Fail"
    });

    //loader user
    builder.addCase(loader.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(loader.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    });

    //updateProfileUser
    builder.addCase(updateProfileUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(updateProfileUser.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = true;
      state.error = ""
    });
    builder.addCase(updateProfileUser.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error="Update Profile Fail"
    });

    //updatePassword
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isAuthenticated = true;
      state.success = action.payload.success
      
    });
    builder.addCase(updatePassword.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = true;
      state.error="";
    });
    builder.addCase(updatePassword.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error="Update Password Fail"
    });


    //fogot password

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.loading = false;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      state.loading = false;
      state.error="Send Email Fail"
    });
   


    //reset password

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.loading = false;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.loading = false;
      state.error="Reset Password Fail"
    });
   
    //get all users
    

     builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.listUser = action.payload.user;
      state.loading = false;
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.loading = false;
      state.error="Get All User Fail"
      state.listUser =[];
    });
   
    //removeUser
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.loading = false;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.loading = false;
      state.error = "Remove User fail";
    });
    // get  user

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.userUpdate = action.payload.user;
      state.loading = false;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
      state.error="Get User Fail"
      state.userUpdate ={};
    });

    //update User

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.loading = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.loading = false;
      state.error="Update User Fail"
    });
  }

  

    

 
});
export const {clearError} = authSlice.actions
export default authSlice;

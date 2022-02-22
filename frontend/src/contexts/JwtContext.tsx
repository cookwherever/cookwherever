export {}
// import { PayloadAction } from '@reduxjs/toolkit';
// import { createContext, Reducer, useEffect, useReducer } from 'react';
//
// import { isTokenExpired, setSession } from '../utils/jwt';
//
// const INITIALIZE = 'INITIALIZE';
// const SIGN_IN = 'SIGN_IN';
// const SIGN_OUT = 'SIGN_OUT';
// const SIGN_UP = 'SIGN_UP';
//
// const initialState = {
//   isAuthenticated: false,
//   isInitialized: false,
//   user: null,
// };
//
// export interface JWTPayload {
//   isAuthenticated: boolean;
//   isInitialized: boolean;
//   user: null | Record<string, any>;
// }
//
// const JWTReducer: Reducer<JWTPayload, PayloadAction<JWTPayload>> = (state, action) => {
//   switch (action.type) {
//     case INITIALIZE:
//       return {
//         isAuthenticated: action.payload.isAuthenticated,
//         isInitialized: true,
//         user: action.payload.user,
//       };
//     case SIGN_IN:
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload.user,
//       };
//     case SIGN_OUT:
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//       };
//
//     case SIGN_UP:
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload.user,
//       };
//
//     default:
//       return state;
//   }
// };
//
// export const AuthContext = createContext(null);
//
// export const AuthProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(JWTReducer, initialState);
//
//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         const accessToken = window.localStorage.getItem('accessToken');
//
//         if (accessToken && isTokenExpired(accessToken)) {
//           setSession(accessToken);
//
//           const response = await axios.get('/api/auth/my-account');
//           const { user } = response.data;
//
//           dispatch({
//             type: INITIALIZE,
//             payload: {
//               isAuthenticated: true,
//               user,
//             },
//           });
//         } else {
//           dispatch({
//             type: INITIALIZE,
//             payload: {
//               isAuthenticated: false,
//               user: null,
//             },
//           });
//         }
//       } catch (err) {
//         console.error(err);
//         dispatch({
//           type: INITIALIZE,
//           payload: {
//             isAuthenticated: false,
//             user: null,
//           },
//         });
//       }
//     };
//
//     return initialize();
//   }, []);
//
//   const signIn = async (email, password) => {
//     const response = await axios.post('/api/auth/sign-in', {
//       email,
//       password,
//     });
//     const { accessToken, user } = response.data;
//
//     setSession(accessToken);
//     dispatch({
//       type: SIGN_IN,
//       payload: {
//         user,
//       },
//     });
//   };
//
//   const signOut = async () => {
//     setSession(null);
//     dispatch({ type: SIGN_OUT });
//   };
//
//   const signUp = async (email, password, firstName, lastName) => {
//     const response = await axios.post('/api/auth/sign-up', {
//       email,
//       password,
//       firstName,
//       lastName,
//     });
//     const { accessToken, user } = response.data;
//
//     window.localStorage.setItem('accessToken', accessToken);
//     dispatch({
//       type: SIGN_UP,
//       payload: {
//         user,
//       },
//     });
//   };
//
//   const resetPassword = (email) => console.log(email);
//
//   return (
//     <AuthContext.Provider
//       value={{
//         ...state,
//         method: 'jwt',
//         signIn,
//         signOut,
//         signUp,
//         resetPassword,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
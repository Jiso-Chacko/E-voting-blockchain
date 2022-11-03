import { createContext, useEffect, useReducer } from "react";

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  voters: []
};

const AuthContext = createContext({
  ...initialState,
});

export const AuthProvider = ({ children }) => {
  const insertVoters = (id, email, password) => {
    initialState.voters.push({
      id: id,
      email: email,
      password: password
    });
  }
  return(
    <AuthContext.Provider
    value={{
      ...initialState,
      insertVoters
    }}
  >
    {children}
  </AuthContext.Provider>
  )
}

export default AuthContext;
    
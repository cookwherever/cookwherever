import {Link} from 'react-router-dom'

import LoginForm from '@wasp/auth/forms/Login'

const LoginPage = () => {
  return (
    <>
      <LoginForm/>
      <br/>
      <span>
        I don't have an account yet (<Link to="/signup">go to signup</Link>).
      </span>
    </>
  )
}

export default LoginPage

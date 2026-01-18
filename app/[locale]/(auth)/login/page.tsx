"use client"

import useLogin from "@/hooks/use-login"

const LoginPage = () => {

  const { mutate, isLoading, error } = useLogin()

  const handleClick = () => {
    mutate({ email: "mohamedelsayed20258@gmail.com", password: "01093588197M!M!" },{
      onSuccess:(data) => {
        console.log("Login Page",data)
      }
    })
  }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error instanceof Error ? error.message : 'An error occurred'}</p>}
    </div>
  )
}

export default LoginPage
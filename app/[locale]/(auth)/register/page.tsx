"use client"

import useRegister from "@/hooks/use-register";


const Register = () => {

    const { mutate, isLoading, error } = useRegister()

    const handleClick = () => {
        mutate({
            email: "ffd@gmail.com",
            password: "0109343832",
            phone: "01093588917",
            "location": "Alexandria, Egypt",
            gender: "Male",
            name: "Fady Fawzy"
        })
    }

    return (
        <div>
            <h1>Register Page</h1>
            <button onClick={handleClick} disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
            </button>
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </div>
    )
}

export default Register;
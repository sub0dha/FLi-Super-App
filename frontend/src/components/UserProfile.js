"use client"

import { useEffect, useState } from "react"

function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetching user data from the backend API (replace with your actual endpoint)
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/user/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Assuming you store the JWT in localStorage
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch user data")
        }

        const data = await response.json()
        setUser(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Error: {error}</h2>
        <div>You might want to check your authentication status.</div>
      </div>
    )
  }

  if (user === null) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>You are not logged in.</h2>
        <button onClick={() => window.location.href = "/login"}>Go to Login</button>
      </div>
    )
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome, {user.firstName} {user.lastName}!</h2>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add more fields as needed */}
    </div>
  )
}

export default UserProfile

export const registerUser = async (userData) => {
    try {
        const response = await fetch("https://jsonserverauth.onrender.com/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        return await response.json(); 
    } catch (error) {
        throw error;  
    }
};


export const loginUser = async (username, password) => {
    try {
      const response = await fetch(`https://jsonserverauth.onrender.com/user/${username}`);
  
      if (!response.ok) {
        throw new Error("User not found or invalid response");
      }
  
      const user = await response.json();
      
      // Check if the user exists and password matches
      if (!user || Object.keys(user).length === 0) {
        throw new Error("Please enter a valid username.");
      }
  
      if (user.password === password) {
        return { success: true, message: "Login Successful" };
      } else {
        throw new Error("Invalid credentials.");
      }
    } catch (error) {
      throw error;
    }
  };
  

export const registerUser = async ({ id,
  name,
  password,
  phone,
  email,
  country,
  address,
  gender}) => {
    try {
        const response = await fetch("https://jsonserverauth.onrender.com/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id,
              name,
              password,
              phone,
              email,
              country,
              address,
              gender}),
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
  
  export const validateUsername = (formData) => {
    const { username } = formData;
    return new Promise((resolve, reject) => {
      fetch(`https://jsonserverauth.onrender.com/user?id=${username}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            resolve({ message: "Username found, please enter a new password." });
          } else {
            reject(new Error("Username not found."));
          }
        })
        .catch((error) => {
          reject(new Error("Error checking username: " + error.message));
        });
    });
  };

  export const resetUserPassword = async (username, newPassword) => {
    try {
      const response = await fetch(`https://jsonserverauth.onrender.com/user/${username}`, {
        method: 'PATCH',  // Update the existing user
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),  
      });
  
      if (!response.ok) {
        throw new Error('User not found or invalid response');
      }
  
      const updatedUser = await response.json();
  
      return { success: true, message: 'Password reset successful.' };
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

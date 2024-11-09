import { showHome } from "./main";

async function  handleLogin(e: SubmitEvent) {
    const credential = document.getElementById("credential") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
  
    console.log(credential.value);
    
    if (!credential || !password) return;
  
    const base64Encode = (username: string, password: string) => {
      return btoa(`${username}:${password}`);
    }
  
    const encodedCredentials = base64Encode(credential.value, password.value);
  
    try {
      const response = await fetch("https://learn.reboot01.com/api/auth/signin", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${encodedCredentials}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
  
      if (response.ok) {
        const data = await response.text();
        localStorage.getItem("jwt");
        const trimmedToken = trimQuotes(data);
        console.log(trimmedToken);
        localStorage.setItem("jwt", trimmedToken);
        showHome();
        console.log("you are logged in!!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Username or password is not correct"}`);
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("An error occurred while trying to log in.");
    }
  }
  
  function trimQuotes(input: string): string {
    return input.replace(/^"|"$/g, "");
  }

  export {handleLogin};
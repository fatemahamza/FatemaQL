const fetchUserData = async () => {
    const query =`
    query {
        user {
            id
        }
    }`;

    try {
        const response = await fetch("https://learn.reboot01.com/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({query})
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result.data.user);
    } catch (error) {
        console.error("Error fetching user data: ", error);
    }
};

export {fetchUserData};
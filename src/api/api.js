export const API = (() => {
    const baseURL = "http://localhost:3000/todos";

    const getLists = () => {
        return fetch(baseURL)
            .then(response => response.json());
    };

    const addList = (goal) => {
        return fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(goal)
        })
            .then(response => response.json());
    };

    const updateList = (id, updates) => {
        return fetch(`${baseURL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updates)
        })
            .then(response => response.json());
    };
    const deleteList = (id) => {
        return fetch(`${baseURL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updates)
        })
            .then(response => response.json());
    }

    return {
        getLists,
        addList,
        updateList,
        deleteList,
    };
})();
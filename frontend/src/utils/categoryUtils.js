export const loadCategories = async () => {
    try {
        const res = await fetch("http://localhost:8080/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        return await res.json(); // data should be an array of { name, image }
    } catch (err) {
        console.error("Failed to load categories", err);
        return []; // or throw err depending on your error handling
    }
};

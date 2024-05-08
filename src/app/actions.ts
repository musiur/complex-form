"use server"

export const CreateProduct = async (data: any) => {
    try {
        const response = await fetch("https://b2b.trelyt.store/api/v1/products/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        console.log(result)
        return result;

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}
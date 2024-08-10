import app from "./app";

const main = async () => {
    
}

main().then(() => {
    app.listen("3001", () => {
        console.info("Server is running on the port 3001");
    });
}).catch(err => {
    console.error(err);
})
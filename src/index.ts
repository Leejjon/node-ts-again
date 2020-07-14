import express from "express";

const PORT = 8080;
const app = express();

app.get( "/", ( req, res ) => {
    res.send( "Hello Leon!" );
} );

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
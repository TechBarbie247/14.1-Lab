const mongoose = require("mongoose");

const UserSchena = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unoque: true },
        password: {
            type: String,
            required: true
        }
});
 module.exports = mongoose.model("User", UserSchena);
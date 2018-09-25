import mongoose from 'mongoose'


const Schema = mongoose.Schema;


let Ticket = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String
    },
    department: {
        type: String
    },
    note: {
        type: String
    },

}, {
    timestamps: true
});

export default mongoose.model('Ticket', Ticket);
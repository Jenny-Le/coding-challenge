import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Ticket from './models/tickets'

const app = express();
const router = express.Router();


app.use(cors());
app.use(bodyParser.json());



mongoose.connect('mongodb://localhost/tickets', { useNewUrlParser: true })


const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established success')
})
//listening to open/start connection of the mongo database

router.route('/tickets').get((req, res) => {
    Ticket.find((err, tickets) => {
        err ? console.log(err) : res.json(tickets)
    });
});

router.route('/tickets/:id').get((req, res) => {
    Ticket.findById(req.params.id, (err, ticket) => {
        err ? console.log(err) : res.json(ticket)
    });
});

router.route('/tickets/add').post((req, res) => {
        let ticket = new Ticket(req.body)
        ticket.save()
        .then(ticket => {
            res.status(200).json({
                'ticket': 'Ticket added successfully'
            });
        })
        .catch(err => {
            res.status(400).send('Failed to create new ticket');
        });
        
});

router.route('/tickets/update/:id').post((req, res) => {
    Ticket.findById(req.params.id, (err, ticket) => {
        if (!ticket)
            return next(new Error('Error'));
        else {
            ticket.title = req.body.title;
            ticket.description = req.body.description;
            ticket.status = req.body.status;
            ticket.department = req.body.department;
            ticket.note = req.body.note

            ticket.save().then (ticket => {
                res.json('Complete');
            }). catch (err => {
                res.status(400).send('Failed');
            });    
        };

    });
});

router.route('/tickets/delete/:id').get((req, res) => {
    Ticket.findByIdAndRemove({_id: req.params.id}, (err, ticket) => {
        err ? res.json(err) : res.json('Removed successfully')
    });
}); 


app.use('/', router);

app.listen(4000, () => console.log('Server is running on port 4000'));
//npm run dev
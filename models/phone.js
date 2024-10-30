const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;
console.log('Connecting to: ', url);

mongoose.connect(url)
.then(result => {
    console.log('Connected to mongoDB');
})
.catch(error => {
    console.log('Error connecting to mongoDB', error.message);
});

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function(v) {
                // La expresión regular se asegura que el formato sea correcto.
                return /^\d{2,3}-\d{5,}$/.test(v);
            },
            message: props => `${props.value} 
is not a valid phone number. The format must have a minimum of 8 digits and be xx-xxxxx or xxx-xxxx.`
        },
        minLength: 8,
        required: true,
    },
});

phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Phone', phoneSchema);
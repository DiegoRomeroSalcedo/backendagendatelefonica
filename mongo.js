const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://diegoandres20201003:${password}@cluster0.7lb65.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Phone = mongoose.model('Phone', phoneSchema);

if ( process.argv.length > 3) {
    const name = process.argv[3];
    const number = process.argv[4];
    const phone = new Phone({
        name: name,
        number: number,
    });

    phone.save().then(result => {
        console.log('Phone save!');
        mongoose.connection.close();
    });
} else {
    Phone.find({}).then(result => {
        result.forEach(note => {
            console.log(note);
        });
        mongoose.connection.close();
    });
}
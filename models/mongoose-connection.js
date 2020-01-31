const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://surajgholap:srj@1998@cluster0-kmd7r.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
            .then(()=>{
                console.log("C");
            }).catch(()=>{
                console.log("E");
            });

            // srj@9604

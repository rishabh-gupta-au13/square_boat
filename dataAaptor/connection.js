const mongoose = require('mongoose')



//-----Database Connection----------
try {

  let Conn = "mongodb+srv://test:test@cluster0.k4ilg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


 

  console.log(Conn)

  mongoose.connect(Conn,

    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }, (err, conn) => {
      if (err) return console.error("Databae Not connected", err);
      mongoose.set('debug', true);
      console.log( `Connected to Database`);

    });

} catch (error) {
   console.log("Database Not conneected", error);
};
//---------------------------------------

module.exports = mongoose;

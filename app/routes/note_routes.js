const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

///POST
  app.post('/notes', (req, res) => {
    const note = { text: req.body.body,
                   title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error' : 'An error has occured' });
      } else {
        // res.send(result.ops[0]);
        res.json(result.ops[0]);
      }
    });
  });


///GET#INDEX
  app.get('/notes', (req, res) => {
    db.collection('notes').find({}).toArray((err, notes) => {
      if (err) {
        res.send({'error' : 'An error has occured'});
      } else {
        // res.send(notes);
        res.json(notes);
      }
    })
  });

///GET#SHOW
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id' : new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error' : 'An error has occured'});
      } else {
        // res.send(item);
        res.json(item);
      }
    })
  });



  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body,
                   title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          // res.send(note);
          res.json(note);
      }
    });
  });



  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id' : new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error' : 'An error has occured'});
      } else {
        // res.send('Note ' + id + ' deleted');
        res.json('Note ' + id + ' deleted');
      }
    })
  });
};

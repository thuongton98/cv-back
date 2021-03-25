
const router = require('express').Router();
// lay du lieu
let Contact = require('../models/contact.model');
//truen ra 
router.route('/').get((req, res)=>{
    Contact.find()
        .then(contacts => res.json(contacts))
        .catch(err => res.status(400).json('Error: ' +err));
});

//add vao
router.route('/add').post((req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const title = req.body.title;
    const comment = req.body.comment;
    
  

    const newContact = new Contact({
        name,
        email,
        title,
        comment
        
    });

    newContact.save()
       .then(()=>res.json('contact added!'))
       .catch(err => res.status(400).json('Error: '+err));
});
//mo id ra trang tao vd sign 
router.route('/:id').get((req,res)=>{
    Contact.findById(req.params.id)
        .then(sign=>res.json(sign))
        .catch(err => res.status(400).json('Error: '+err));
})
//delete
router.route('/:id').delete((req,res)=>{
    Contact.findByIdAndDelete(req.params.id)
        .then(() =>res.json('Contact deleted.'))
        .catch(err => res.status(400).json('Error: '+err));
})
//update
router.route('/update/:id').post((req,res)=>{
    Contact.findById(req.params.id)
        .then(contacts=>{
            contacts.name = req.body.name;
            contacts.email = req.body.email;
            contacts.title = req.body.title;
            contacts.comment = req.body.comment;
            
            contacts.save()
       .then(()=>res.json('contacts update!'))
       .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
})
module.exports = router;

const Alumni=require('../models/alumni');
const express=require('express');
const router=express.Router();

router.get('/', async (req, res) => {
    try{
        const alumnis = await Alumni.find().populate({
            path: 'Class',
            select: 'ClassName'
        });
	    res.json(alumnis);
} catch (error) {
    console.error("Error Fetching Data:", error.message);
    res.status(500).send("Error Fetching Data")
}
});
router.get('/:id', async (req, res) => {
try {
    const result = await Alumni.findById(req.params.id);
	res.json({result});
} catch (error) {
    console.error("Data not Found:", error.message);
        res.status(404).send("Data not Found")
    }
});


router.post('/new', (req, res) => {
    try {
        var spec=req.body.Spec;
        if(req.body.Spec==null){spec="No Specialty"}
        const alumni = new Alumni({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Age: req.body.Age,
            Spec:spec,
            Level:req.body.Level,
            Class:null,
        })
    
        alumni.save();
    
        res.json(alumni);    
    } catch (error) {
        console.error("Error Adding Data:", error.message);
        res.status(500).send("Error Adding Data")   
    }
	
});

router.delete('/delete/:id', async (req, res) => {
try {	
    const result = await Alumni.findByIdAndDelete(req.params.id);
	res.json({result});
} catch (error) {
    console.error("Error Deleting Data:", error.message);
    res.status(500).send("Error Deleting Data") 
}
});


router.put('/update/:id', async (req, res) => {
    try {
        const alumni = await Alumni.findById(req.params.id);
        if(req.body.Spec!=alumni.Spec){alumni.Class=null}
        if(req.body.Level!=alumni.Level){alumni.Class=null}
        if(req.body.FirstName){alumni.FirstName= req.body.FirstName;}
        if(req.body.LastName){alumni.LastName= req.body.LastName;}
        if(req.body.Age){ alumni.Age=req.body.Age;}
        if(req.body.Spec){alumni.Spec=req.body.Spec;}
        if(req.body.Level){alumni.Level=req.body.Level;}
        if(req.body.Class){alumni.Class=req.body.Class;}
    
        alumni.save();
    
        res.json(alumni);   
    } catch (error) {
        console.error("Error Updating Data:", error.message);
        res.status(500).send("Error Updating Data")        
    }
	
});

module.exports=router;
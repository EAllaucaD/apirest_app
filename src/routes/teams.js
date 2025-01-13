const { Router } = require('express');
const router = Router();
const sd = require('underscore');

const teams = require('../data.json');
//console.log(teams);

router.get('/hello', (req,res) => {
    res.send('Hello World');
})


//GET
router.get('/', (req,res) => {
    res.json(teams);
})



// GET by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const team = teams.find(team => team.id === parseInt(id));
    if (team) {
        res.json(team);
    } else {
        res.status(404).send('Team not found');
    }
});


//POST
router.post('/', (req,res) => {
    const {nombre, fundacion, estadio, ciudad} = req.body
    if (nombre || fundacion || estadio ||ciudad){
        const id = teams.length +1;
        const newTeams = {...req.body, id};
        teams.push(newTeams);
        res.json(teams);
        res.send('Information saved')
    } else {
        res.send('Information not saved')
    }
    //console.log(req.body);
})


//DELETE
router.delete('/:id', (req,res) => {
    const { id } = req.params;
    sd.each(teams, (team,i) =>{
        if (team.id == id){
            teams.splice(i,1);
        }
    });
    res.send(teams);
    
});



module.exports = router;
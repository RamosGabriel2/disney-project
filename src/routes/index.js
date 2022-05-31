const express = require('express');
const router = express.Router();

const Character = require('../models/character');
const Movie = require('../models/movie');

router.get('/', async(req, res) => {
    const character = await Character.find();
    const movie = await Movie.find();
    res.render('index', {
        character,
        movie
    });
});


// Routes for characters

router.get('/characters', async(req, res) => {
    const character = await Character.find();
    res.render('characters/characters', {
        character
    });
});

router.get('/addCharacter', (req, res) => {
    var error = false;
    res.render('characters/addCharacter', {
        error
    });
});

router.post('/addCharacter', async(req, res) =>{
    const { name, age, weight, history, movie} = req.body;
    var error = false;

    if(!name || !age || !weight || !history || !movie){
        error = true;
    }

    if(error){
        res.render('characters/addCharacter', {
            error,
            errorMsg: "Complete all the fields",
        })
    }else{
        const character = new Character({name, age, weight, history, movie});
        await character.save();
        res.redirect('/characters');
    }
});

router.get('/editCharacter/:id', async(req, res) => {
    const {id} = req.params;
    const character = await Character.findById({_id: id})
    res.render('characters/editCharacter', {
        character
    });
});

router.post('/updateCharacter/:id', async(req, res) => {
    const { id } = req.params;
    await Character.updateOne({_id: id}, req.body);
    res.redirect('/characters');
});

router.get('/deleteCharacter/:id', async(req, res) => {
    const { id } = req.params;
    await Character.remove({_id: id});
    res.redirect('/characters');
});


// Routes for Movies or Series

router.get('/movies', async(req, res) => {
    const movie = await Movie.find();
    res.render('movies/movies', {
        movie
    });
})

router.get('/addMovie', (req, res) => {
    var error = false;
    res.render('movies/addMovie', {
        error
    });
});

router.post('/addMovie', async(req, res) => {
    // const movie = new Movie(req.body);
    // await movie.save();
    // res.redirect('/movies')

    const { title, creationDate, qualification, associatedChar } = req.body;
    var error = false;

    if(!title || !creationDate || !qualification || !associatedChar){
        error = true;
    }

    if(error){
        res.render('movies/addMovie', {
            error,
            errorMsg: "Complete all the fields"
        })
    }else{
        const movie = new Movie({title, creationDate, qualification, associatedChar});
        await movie.save();
        res.redirect('/movies');
    }
});

router.get('/editMovie/:id', async(req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById({_id: id});
    res.render('movies/editMovie', {
        movie
    });
});

router.post('/updateMovie/:id', async(req,res) => {
    const { id } = req.params;
    await Movie.updateOne({_id: id}, req.body);
    res.redirect('/movies');
})

router.get('/deleteMovie/:id', async(req, res) => {
    const { id } = req.params;
    await Movie.remove({_id: id});
    res.redirect('/movies');
})

module.exports = router;
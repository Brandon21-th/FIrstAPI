const { Router } = require('express');
const router = Router();


const movies = require('../sample.json');
const _ = require('underscore');

router.get('/', (req, res) => {
    res.json(movies);
});

router.post('/', (req, res) => {

    const {title, director, year, raiting} = req.body;

    if(title && director && year && raiting ){
        const id = movies.length + 1;
        const newMovie = {...req.body, id};
        movies.push(newMovie);
      //s  res.json('saved');
        res.json(movies);
    }
    else{
        res.status(500).json({error: 'There was an error.'})
    }
}) ;

router.put('/:id', (req, res) =>{
    const {id} =  req.params;
    const {title, director, year, raiting} = req.body;
    if(title && director && year && raiting ){
        _.each(movies, (movie, i) =>{
            if(movie.id == id){
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.raiting = raiting;
            }
        });
        res.json(movies);
    } else {
        res.status(500).json({error: 'There was an error.'})
    }
});

router.delete('/:id', (req,res) => {
    const { id } = req.params;
   _.each(movies, (movie, i) => {
    if( movie.id == id) {
        movies.splice(i, 1);
    }
   });
    res.send(movies)

});

module.exports = router;
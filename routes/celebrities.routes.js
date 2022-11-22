const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

//CREATE
router.get('/celebrities/create', (req, res, next) => {
    try{
        res.render('celebrities/new-celebrity')
    } catch(error) {
        next(error)
    }
})

router.post('/celebrities/create', async (req, res, next) => {
    try {
    const {name, occupation, catchPhrase} = req.body;
    const newCelebrity = await Celebrity.create({
        name,
        occupation,
        catchPhrase
    });  //ou simplesmente podia ser Book.create(re.body) em vez de escrevefr o title author, description e rating
    console.log('A new celebrity was created:', newCelebrity.name)
    //after creeating the book we redirect the user to the list
    res.redirect('/celebrities')
    } catch(error) {
        next(error)
        res.render('/new-celebrity')
    }
});

//READ
router.get('/celebrities',  async (req, res, next) => {
    try {
        const allCelebrities = await Celebrity.find();
        res.render('celebrities/celebrities', {celebrities: allCelebrities})
    } catch(error) {
        console.log('error', error)
        next(error)
    }
});

module.exports = router;
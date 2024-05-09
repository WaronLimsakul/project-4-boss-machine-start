const express = require('express');
const apiRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } = require('./db');
const { checkMillionDollarIdea } = require('./checkMillionDollarIdea');


module.exports = apiRouter;

//minions routes
apiRouter.get('/minions', (req, res, next) => {
    const minionsArray = getAllFromDatabase('minions');
    res.send(minionsArray);
});

apiRouter.post('/minions', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
    const foundMinion = getFromDatabaseById('minions', req.params.minionId);
    if (foundMinion) {
        res.send(foundMinion);
    } else {
        res.status(404).send('minion not found');
    }
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
    const editedMinion = req.body;
    editedMinion.id = req.params.minionId;
    const updatedMinion = updateInstanceInDatabase('minions', editedMinion);
    if (updatedMinion) {
        res.send(updatedMinion);
    } else {
        res.status(404).send('invalid input');
    }
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const id = req.params.minionId;
    const deleteState = deleteFromDatabasebyId('minions', id);
    if (deleteState) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

//minion's work routes
apiRouter.get('/minions/:minionId/work', (req, res, next) => {
    const minionId = req.params.minionId;
    const foundWork = getAllFromDatabase('work').filter(work => work.minionId === minionId);
    if  (foundWork) {
        res.send(foundWork);
    } else {
        res.status(404).send();
    }
}) //much retrieve works that match minionId

apiRouter.post('/minions/:minionId/work' ,(req, res, next) => {
    req.body.minionId = req.params.minionId;
    const newWork = addToDatabase('work', req.body);
    res.send(newWork);
});

apiRouter.put('/minions/:minionId/work/:workId', (req, res, next) => {
    req.body.minionId = req.params.minionId;
    req.body.workId = req.params.workId;
    const updatedWork = updateInstanceInDatabase('work', req.body);
    if (updatedWork) {
        res.send(updatedWork);
    } else {
        res.status(404).send('invalid input');
    }
});

apiRouter.delete('/minions/:minionId/work/:workId', (req, res, next) => {
    const deleteState = deleteFromDatabasebyId('work', req.params.workId);
    if (deleteState) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

//ideas routes
apiRouter.get('/ideas', (req, res, next) => {
    const ideasArray = getAllFromDatabase('ideas');
    res.send(ideasArray);
});

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    const foundIdea = getFromDatabaseById('ideas', req.params.ideaId);
    if (foundIdea) {
        res.send(foundIdea);
    } else {
        res.status(404).send('idea not found');
    }
});

apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
    const editedIdea = req.body;
    editedIdea.id = req.params.ideaId;
    const updatedIdea = updateInstanceInDatabase('ideas', editedIdea);
    if (updatedIdea) {
        res.send(updatedIdea);
    } else {
        res.status(404).send('invalid input');
    }
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    const id = req.params.ideaId;
    const deleteState = deleteFromDatabasebyId('ideas', id);
    if (deleteState) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

//meetings routes
apiRouter.get('/meetings', (req, res, next) => {
    const meetingsArray = getAllFromDatabase('meetings');
    res.send(meetingsArray);
});

apiRouter.post('/meetings', (req, res, next) => {
    createMeeting();
});

apiRouter.delete('/meetings', (req, res, next) => {
    deleteAllFromDatabase('meetings');
})
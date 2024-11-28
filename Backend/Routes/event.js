const express = require('express');
const { addEvent, addParticipate, showEvent, viewParticipants, deleteParticipants } = require('../controllers/event');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'public/images')
    },
    filename:(req, file, cb)=>{
        cb(null, file.filename+"_" + Date.now() + (file.originalname)) 
        // path.extname
    }
})
  
  const upload = multer({
    storage:storage
  });

router.route('/api/showEvent').get(showEvent) 
router.route('/api/viewParticipants').post(viewParticipants)
router.route('/api/deleteParticipants/:id').delete(deleteParticipants)

router.route('/api/addEvent').post(upload.single('photo') ,addEvent)

router.route('/api/addParticipate').post(addParticipate)

module.exports = router;
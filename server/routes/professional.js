const express=require('express');
const router=express.Router();
const ProfesionalController=require('../controllers/professionals')


router.get('/professional',ProfesionalController.getData)
router.post('/addInfo',ProfesionalController.create)
router.put('/updateInfo',ProfesionalController.update)
router.delete('/deleteProfessional',ProfesionalController.delete)

module.exports=router
const express = require('express');
const router = express.Router();

const fs = require('fs/promises')

router.get('/html',async (req,res)=>{
    try {
        const htmlContent = await fs.readFile('D:/Project/Major/public/index.html', 'utf8');
        res.send(htmlContent);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading HTML file');
    }
});

router.get('/women',async(req,res)=>{
    try {
        res.render('profile')
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading HTML file');
    }
})

module.exports = router;

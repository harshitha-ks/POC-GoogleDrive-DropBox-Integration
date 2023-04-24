const express = require("express")
const router = express.Router()
const { downloadFromGoogle } = require('./googleDrive');
const { downloadFromDropBox } = require('./dropBox')

// Handling request using router

router.post('/download', (req, res, next) => {
    if (req.body.service === 'google') return downloadFromGoogle(req.body.docs)
    return downloadFromDropBox(req.body);
});

module.exports = router;
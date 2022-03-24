const express = require("express")
const router = express.Router()

const Note = require("../models/Note")

router.get("/", async (req, res) => {
    const notes = await Note.find()
    res.json(notes)
})

router.get('/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note);
});

router.post("/", async (req, res) => {

    const note = new Note(req.body)
    await note.save()
    res.json({
        status: "note saved"
    })
})

router.put("/:id", async (req, res) => {
    await Note.findByIdAndUpdate(req.params.id, req.body)
    res.json({
        status: "note updated"
    })
})

router.delete('/:id', async (req, res) => {
    await Note.findByIdAndRemove(req.params.id)
    res.json({
        status: 'note deleted'
    })
})

module.exports = router
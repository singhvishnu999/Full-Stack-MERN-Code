const Events = require('../modals/Event')


module.exports.showEvent = async (req, res) => {
    try{
    const event = await Events.find({});
    res.status(200).json({event})

    }catch(err){
        res.status(200).json({err})
    }
}
module.exports.addEvent = async (req, res) => {
    const event = new Events(req.body);
    event.photo = req.file.filename
    await event.save();

    res.status(201).json({success:true, message: 'Event Added'});   
}

module.exports.addParticipate = async (req, res) => {
    let id = req.body
    const event = await Events.findById(id._id) 
    await event.participants.push(id.token)
    event.save()
    res.status(200).json({success:true, message:"participated successfully"})
}

module.exports.viewParticipants = async(req, res) => {
    const event = await Events.findById(req.body._id).populate('participants');
    res.status(200).json({success:true, participants : event.participants})
}

module.exports.deleteParticipants = async(req, res) => {
    const {id} = req.params;
    const event = await Events.findByIdAndDelete(id)
    res.status(200).json({success:true, message : 'Deleted Successfully'})
}

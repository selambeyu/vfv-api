const mongoose=require('mongoose');

const TokenSchma=mongoose.Schema
({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'professional' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
})

module.exports=mongoose.model('Token',TokenSchma);
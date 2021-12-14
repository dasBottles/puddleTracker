import dbConnect from "../../lib/dbConnect"
import User from "../../models/User"
import bcrypt from 'bcrypt'

export default async function handler (req, res) {
    await dbConnect()
    try {
    const user = await User.findOne({username: req.body.username});
    !user && res.status(400).json('Invalid username or password.');

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password,
    );
    !validPassword && res.status(400).json('Invalid username or password.');
    
    res.status(200).json({_id: user._id, user: user.username});
    } catch (err) {
    res.status(500).json(err)
    }
}
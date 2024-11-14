import User from '../models/userInfo.js';

const pullData = async function (req, res) {
    const { username } = req.params; // get username from the request parameters
    console.log(username);
    try {
        // first find the corresponding userID based on username
        const user = await User.findOne({ username: username });

        // check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userID = user._id; // get userID

        // find the corresponding data based on userID
        const data = await User.findById(userID)
            .select('-password')
            .populate({
                path: 'sessionIdList',
                select: 'content'
            });

        // check if the data exists
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }

        // output the content to the console
        data.sessionIdList.forEach((session, index) => {
            console.log(`Session ${index + 1} content:`, session.content);
        });

        // return the data to the client
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default pullData;

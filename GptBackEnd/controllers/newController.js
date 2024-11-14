import User from '../models/userInfo.js';

const pullData = async function (req, res) {
    const { username } = req.params; // 从请求参数中获取 username
    console.log(username);
    try {
        // 先根据 username 查找对应的 userID
        const user = await User.findOne({ username: username });

        // 检查用户是否存在
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userID = user._id; // 获取 userID

        // 根据 userID 查找对应的数据
        const data = await User.findById(userID)
            .select('-password')
            .populate({
                path: 'sessionIdList',
                select: 'content'
            });

        // 检查数据是否存在
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }

        // 输出 content 内容到控制台
        data.sessionIdList.forEach((session, index) => {
            console.log(`Session ${index + 1} content:`, session.content);
        });

        // 返回数据给客户端
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default pullData;

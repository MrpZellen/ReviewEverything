import User from '../../models/User.js';

async function addUser(user) {
    const { username, description, movieReviews, isAdmin } = user;

    try {
        const newUser = await User.create({ username, description, movieReviews, isAdmin });
        return newUser;
    } catch (err) {
        console.error('addUser failed:', err.message);
        return null;
    }
}

async function updateToAdmin(userID) {
    try {
        const user = await User.findByPk(userID);

        if (!user) {
            console.error('updateToAdmin failed: user not found');
            return null;
        }

        user.isAdmin = true;
        await user.save();
        return user;
    } catch (err) {
        console.error('updateToAdmin failed:', err.message);
        return null;
    }
}

async function updateUser(userID, updatedFields) {
    try {
        const user = await User.findByPk(userID);

        if (!user) {
            console.error('updateUser failed: user not found');
            return null;
        }

        await user.update(updatedFields);
        return user;
    } catch (err) {
        console.error('updateUser failed:', err.message);
        return null;
    }
}

async function deleteUser(userID) {
    try {
        const user = await User.findByPk(userID);

        if (!user) {
            console.error('deleteUser failed: user not found');
            return null;
        }

        await user.destroy();
        return user;
    } catch (err) {
        console.error('deleteUser failed:', err.message);
        return null;
    }
}

async function getTopFiftyUsers() {
    try {
        const users = await User.findAll({ limit: 50 });
        return users;
    } catch (err) {
        console.error('getTopFiftyUsers failed:', err.message);
        return null;
    }
}

async function getUser(userID) {
    try {
        const user = await User.findByPk(userID);
        return user ?? null;
    } catch (err) {
        console.error('getUser failed:', err.message);
        return null;
    }
}

async function getAllUsers() {
    try {
        const users = await User.findAll();
        return users;
    } catch (err) {
        console.error('getAllUsers failed:', err.message);
        return null;
    }
}

export {
    addUser,
    updateToAdmin,
    updateUser,
    deleteUser,
    getTopFiftyUsers,
    getUser,
    getAllUsers,
};
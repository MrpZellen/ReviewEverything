const registration = {
    register: async (req, res) => {
        const { username, description, movieReviews, isAdmin } = req.body;
        try {
            const newUser = await User.create({
                username,
                description,
                movieReviews,
                isAdmin
            });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Failed to register user' });
        }
    }
}
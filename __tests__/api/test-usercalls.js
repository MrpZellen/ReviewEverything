let createdUserID;

const seededUser = {
    username:     'grubulon_schmeeze',
    description:  'Self-appointed cinematic overlord. If it has lens flare, I have opinions.',
    movieReviews: [1226863],
    isAdmin:      true,
};

const newUser = {
    username:     'brandnewuser',
    description:  'a test user',
    movieReviews: [],
    isAdmin:      false,
};

describe("User API", () => {

    test("GET /api (copied cause same as other test)", async () => {
        const response = await fetch("http://localhost:3100/api");
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.isServingJSON).toBe(true);
    });

    test("GET /api/users", async () => {
        const response = await fetch("http://localhost:3100/api/users");
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.users).toBeDefined();

        const found = data.users.find(u => u.username === seededUser.username);
        expect(found).toBeDefined();
        expect(found.description).toBe(seededUser.description);
        expect(found.isAdmin).toBe(seededUser.isAdmin);
    });

    test("GET /api/users/top", async () => {
        const response = await fetch("http://localhost:3100/api/users/top");
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.users).toBeDefined();

        const found = data.users.find(u => u.username === 'busybobathan');
        expect(found).toBeDefined();
    });

    test("POST /api/user", async () => {
        const response = await fetch(
            "http://localhost:3100/api/user",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            }
        );
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.user).toBeDefined();
        expect(data.user.username).toBe(newUser.username);
        createdUserID = data.user.id;
    });

    test("GET /api/user", async () => {
        const response = await fetch(`http://localhost:3100/api/user?userID=${createdUserID}`);
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.user).toBeDefined();
        expect(data.user.username).toBe(newUser.username);
    });

    test("PATCH /api/user", async () => {
        const response = await fetch(
            "http://localhost:3100/api/user",
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userID: createdUserID,
                    description: "updated description"
                })
            }
        );
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.user).toBeDefined();
        expect(data.user.description).toBe("updated description");
    });

    test("PATCH /api/user/admin", async () => {
        const response = await fetch(
            "http://localhost:3100/api/user/admin",
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userID: createdUserID })
            }
        );
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.user).toBeDefined();
        expect(data.user.isAdmin).toBe(true);
    });

    test("DELETE /api/user", async () => {
        const response = await fetch(
            "http://localhost:3100/api/user",
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userID: createdUserID })
            }
        );
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.posted).toBeDefined();
    });

});
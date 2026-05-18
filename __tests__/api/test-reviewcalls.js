let createdReviewId;

jest.setTimeout(30000);

describe("Review API scthuff", () => {

    test("GET / should prove we are online", async () => {
        const response = await fetch("http://localhost:3100/api");
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.isServingJSON).toBe(true);
    });

    test("POST /user/reviews should create review", async () => {
        const reviewData = {
            userID: 0,
            movieID: "1226863",
            reviewText: "great movie",
            rating: 5
        };
        const response = await fetch(
            "http://localhost:3100/api/user/reviews",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData)
            }
        );
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.givenID).toBeDefined();
        createdReviewId = data.givenID;
    });

    test("GET /user/reviews", async () => {
        const response = await fetch("http://localhost:3100/api/user/reviews?userID=0");
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.reviews).toBeDefined();
    });

    test("GET /movies/reviews", async () => {
        const response = await fetch("http://localhost:3100/api/movies/reviews?movieID=1226863");
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.reviews).toBeDefined();
    });

    test("PATCH /user/reviews updates review", async () => {
        const response = await fetch(
            "http://localhost:3100/api/user/reviews",
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    reviewID: createdReviewId,
                    reviewText: "updated review"
                })
            }
        );
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.posted).toBeDefined();
    });

    test("PATCH /user/rate/:rate", async () => {
        const response = await fetch(
            "http://localhost:3100/api/user/rate/true",
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reviewID: createdReviewId })
            }
        );
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.wasRated).toBeDefined();
    });

    test("DELETE /user/reviews deletes review", async () => {
        const response = await fetch(
            "http://localhost:3100/api/user/reviews",
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reviewID: createdReviewId })
            }
        );
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.posted).toBeDefined();
    });
});
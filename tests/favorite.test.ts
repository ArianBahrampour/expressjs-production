import request from "supertest";
import express from "express";
import { router } from "../src/routes/favorite.router";
import { Favorite } from "../src/models/Favorite";
import logger from "../src/utils/logger";

jest.mock("../models/Favorite", () => ({
    Favorite: {
        find: jest.fn(),
    },
}));

jest.mock("../utils/logger", () => ({
    info: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(router);

describe("GET /api/favorite", () => {
    it("should return an array of favorites", async () => {
        const mockFind = jest.spyOn(Favorite, "find").mockResolvedValue(["favorite1", "favorite2"]);

        const response = await request(app).get("/api/favorite");

        expect(mockFind).toHaveBeenCalled();
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ favorite: ["favorite1", "favorite2"] });

        mockFind.mockRestore();
    });
});

describe("GET /api/favorite/:profile_id", () => {
    it("should return favorites for a specific profile", async () => {
        const mockFind = jest.spyOn(Favorite, "find").mockResolvedValue(["favorite1", "favorite2"]);
        const mockInfo = jest.spyOn(logger, "info");

        const profileId = "exampleProfileId";
        const response = await request(app).get(`/api/favorite/${profileId}`);

        expect(mockInfo).toHaveBeenCalledWith({ profile_id: profileId });
        expect(mockFind).toHaveBeenCalledWith({ profile_id: profileId });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(["favorite1", "favorite2"]);

        mockFind.mockRestore();
        mockInfo.mockRestore();
    });

    it("should return an error if profile_id is undefined", async () => {
        const profileId = "undefined";

        const response = await request(app).get(`/api/favorite/${profileId}`);

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ message: "profile_id is undefined" });
    });

    it("should return an error if no favorites found", async () => {
        const mockFind = jest.spyOn(Favorite, "find").mockResolvedValue(null);

        const profileId = "exampleProfileId";
        const response = await request(app).get(`/api/favorite/${profileId}`);

        expect(mockFind).toHaveBeenCalledWith({ profile_id: profileId });
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: "Not Found" });

        mockFind.mockRestore();
    });
});

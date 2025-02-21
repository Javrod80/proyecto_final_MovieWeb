module.exports = {
    transform: {
        "^.+\\.js$": "babel-jest",
    },
    testEnvironment: "node",
    globals: {
        "jest": {
            "transform": {
                "^.+\\.js$": "babel-jest"
            }
        }
    }
};

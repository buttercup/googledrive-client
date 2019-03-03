const HotPatcher = require("hot-patcher");
const VError = require("verror");
const { createClient } = require("../../source/index.js");
const testResults = require("./resources/directoryContentsResponse.json");

const FAKE_TOKEN = "aaaaabbbbbbccccccddddddeeeeee";

describe("fileContents", function() {
    describe("getFileContents", function() {
        beforeEach(function() {
            this.requestSpy = sinon.stub().returns(Promise.resolve({
                data: "test\ncontents",
                status: 200,
                statusText: "OK"
            }));
            this.client = createClient(FAKE_TOKEN);
            this.client.patcher.patch("request", this.requestSpy);
        });

        it("returns expected data", function() {
            return this.client.getFileContents("abc").then(res => {
                expect(res).to.equal("test\ncontents");
            });
        });

        it("includes auth flag if error failed due to authorization", function() {
            const failureError = new Error("Request failed with status code 401");
            failureError.response = {
                data: {
                    "error": {
                        "errors": [
                            {
                            "domain": "global",
                            "reason": "authError",
                            "message": "Invalid Credentials",
                            "locationType": "header",
                            "location": "Authorization"
                            }
                        ],
                        "code": 401,
                        "message": "Invalid Credentials"
                    }
                }
            }
            this.requestSpy.returns(Promise.reject(failureError))
            return this.client.getFileContents("abc").then(res => {
                throw new Error("Request should have failed");
            }).catch(err => {
                const info = VError.info(err);
                expect(info).to.have.property("authFailure", true);
            });
        });
    });
});

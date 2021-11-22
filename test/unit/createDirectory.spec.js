const { createClient } = require("../../source/index.js");

const FAKE_TOKEN = "aaaaabbbbbbccccccddddddeeeeee";

describe("createDirectory", function() {
    describe("createDirectory", function() {
        beforeEach(function() {
            this.requestSpy = sinon.stub().returns(Promise.resolve({
                data: {
                    id: "testingid"
                },
                status: 200,
                statusText: "OK"
            }));
            this.client = createClient(FAKE_TOKEN);
            this.client.patcher.patch("request", this.requestSpy);
        });

        it("uses correct HTTP method", function() {
            return this.client.createDirectory({ name: "test" }).then(() => {
                const reqParams = this.requestSpy.firstCall.args[0];
                expect(reqParams).to.have.property("method", "POST");
            });
        });

        it("passes correct directory name", function() {
            return this.client.createDirectory({ name: "test" }).then(() => {
                const reqParams = this.requestSpy.firstCall.args[0];
                expect(reqParams).to.have.nested.property("body.name").to.equal("test");
            });
        });

        it("passes no parents when none specified", function() {
            return this.client.createDirectory({ name: "test" }).then(() => {
                const reqParams = this.requestSpy.firstCall.args[0];
                expect(reqParams).to.have.nested.property("body.parents").to.deep.equal([]);
            });
        });

        it("passes parent in array when specified", function() {
            return this.client.createDirectory({ name: "test", parent: "123testing" }).then(() => {
                const reqParams = this.requestSpy.firstCall.args[0];
                expect(reqParams).to.have.nested.property("body.parents").to.deep.equal(["123testing"]);
            });
        });
    });
});

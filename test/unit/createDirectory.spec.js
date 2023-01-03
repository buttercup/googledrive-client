import sinon from "sinon";
import { expect } from "chai";
import { GoogleDriveClient } from "../../dist/index.js";

const FAKE_TOKEN = "aaaaabbbbbbccccccddddddeeeeee";

describe("createDirectory", function() {
    describe("createDirectory", function() {
        beforeEach(function() {
            this.requestSpy = sinon.stub().returns(Promise.resolve({
                json: () => Promise.resolve({
                    id: "testingid"
                }),
                ok: true,
                status: 200,
                statusText: "OK"
            }));
            this.client = new GoogleDriveClient(FAKE_TOKEN);
            this.client.patcher.patch("request", this.requestSpy);
        });

        it("uses correct HTTP method", function() {
            return this.client.createDirectory("test").then(() => {
                const reqParams = this.requestSpy.firstCall.args[0];
                expect(reqParams).to.have.property("method", "POST");
            });
        });

        it("passes correct directory name", function() {
            return this.client.createDirectory("test").then(() => {
                const reqParams = this.requestSpy.firstCall.args[0];
                const body = JSON.parse(reqParams.body);
                expect(body).to.have.nested.property("name").to.equal("test");
            });
        });

        it("passes no parents when none specified", function() {
            return this.client.createDirectory("test").then(() => {
                const reqParams = this.requestSpy.firstCall.args[0];
                const body = JSON.parse(reqParams.body);
                expect(body).to.have.nested.property("parents").to.deep.equal([]);
            });
        });

        it("passes parent in array when specified", function() {
            return this.client.createDirectory("test", "123testing").then(() => {
                const reqParams = this.requestSpy.firstCall.args[0];
                const body = JSON.parse(reqParams.body);
                expect(body).to.have.nested.property("parents").to.deep.equal(["123testing"]);
            });
        });
    });
});

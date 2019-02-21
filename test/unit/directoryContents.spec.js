const HotPatcher = require("hot-patcher");
const { createClient } = require("../../source/index.js");
const testResults = require("./resources/directoryContentsResponse.json");

const FAKE_TOKEN = "aaaaabbbbbbccccccddddddeeeeee";

describe("directoryContents", function() {
    describe("getDirectoryContents", function() {
        beforeEach(function() {
            this.requestSpy = sinon.stub().returns(Promise.resolve({
                data: testResults,
                status: 200,
                statusText: "OK"
            }));
            this.client = createClient(FAKE_TOKEN);
            this.client.patcher.patch("request", this.requestSpy);
        });

        it("returns a root tree node by default", function() {
            return this.client.getDirectoryContents().then(res => {
                expect(res).to.have.property("files").that.is.an("array");
                expect(res).to.have.property("children").that.is.an("array");
                expect(res).to.have.property("id").that.is.null;
                expect(res).to.have.property("filename").that.is.null;
            });
        });

        it("returns file results", function() {
            return this.client.getDirectoryContents().then(res => {
                const [file] = res.files;
                expect(file).to.have.property("id").that.is.a("string");
                expect(file).to.have.property("filename").that.is.a("string");
                expect(file).to.have.property("filename").that.is.a("string");
                expect(file).to.have.property("mime").that.is.a("string")
                    .that.matches(/\w+\/\w+/);
                expect(file).to.have.property("type").that.is.a("string")
                    .that.matches(/^(file|directory)$/);
                expect(file).to.have.property("created").that.is.a("string");
                expect(file).to.have.property("modified").that.is.a("string");
                expect(file).to.have.property("size").that.is.a("number");
                expect(file).to.have.property("shared").that.is.a("boolean");
            });
        });

        it("returns an array of file results when tree:false", function() {
            return this.client.getDirectoryContents({ tree: false }).then(res => {
                const [file] = res;
                expect(file).to.have.property("id").that.is.a("string");
                expect(file).to.have.property("filename").that.is.a("string");
                expect(file).to.have.property("filename").that.is.a("string");
                expect(file).to.have.property("mime").that.is.a("string")
                    .that.matches(/\w+\/\w+/);
                expect(file).to.have.property("type").that.is.a("string")
                    .that.matches(/^(file|directory)$/);
                expect(file).to.have.property("created").that.is.a("string");
                expect(file).to.have.property("modified").that.is.a("string");
                expect(file).to.have.property("size").that.is.a("number");
                expect(file).to.have.property("shared").that.is.a("boolean");
            });
        });
    });
});

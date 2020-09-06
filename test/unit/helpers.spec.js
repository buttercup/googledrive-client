const { encodeBase64 } = require("../../source/helpers.js");

describe("helpers", function() {
    describe("encodeBase64", function() {
        it("encodes base64", function() {
            expect(encodeBase64("This is some text!")).to.equal("VGhpcyBpcyBzb21lIHRleHQh");
        });
    });
});

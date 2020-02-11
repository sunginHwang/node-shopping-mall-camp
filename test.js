var chai = require('chai')
    , expect = chai.expect
    , assert = chai.assert
    , should = chai.should();

describe('asset 및 expect 사용해 보기', function () {

    var a = 1;
    var b = 1;
    var foo = "문자열임";
    var c = 2;

    it('a, b 일치 하는지 체크', function () {
        assert.equal( a , b , '서로 일치 해야됨');
    });

    it('문자열 인지 체크', function () {
        foo.should.be.a('string');
    });

    it('c가 null 인지 체크', function () {
        expect( c , "null 이 아니어야 됩니다." ).to.not.null;
    });

});
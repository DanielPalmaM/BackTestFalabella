//@ts-check

/**
 * @name = Suite Pruebas Back
 */
let chaiHttp  = require('chai-http');
let chai      = require('chai');
let assert    = require("chai").assert;
const expect  = require('chai').expect;
chai.use(chaiHttp);
const urlPrincipal = 'https://rickandmortyapi.com';

/**
 * Test que obtiene todos los personajes de la API
 * @param string chai.request
 * @param string
 */
describe('Get All Character:', () => {
    it('status code 200 y 671 registros en total', (done) => {
        chai.request(urlPrincipal)
            .get('/api/character')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                assert.equal(res.body.info.count,"671");
                done();
            });
    });

});   

/**
 * Test que filtra por Id y nombre de Personaje con comprobación de datos
 * @param string 1
 * @param string Black Rick
 */
describe('Get Filter Character:', () => {
    it('Filter name=Black Rick and status=alive', (done) => {
        chai.request(urlPrincipal)
            .get('/api/character/?name=Black Rick&status=alive')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                assert.equal(res.body.results[0].name,"Black Rick");
                assert.equal(res.body.results[0].status,"Alive"); 
                done();
            });
    });

});

/**
 * Test que obtiene todos los personajes de la API
 * @param string chai.request
 * @param string
 */
describe('Get Multiple Character id:', () => {
    it('Filter id=2 y id=184', (done) => {
        chai.request(urlPrincipal)
            .get('/api/character/2,184')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                assert.equal(res.body[0].id,"2");
                assert.equal(res.body[1].id,"184");  
                done();
            });
    });

});

/**
 * Test que consulta por un id de personaje
 */
describe('Get a Single Character id:', () => {
    it('Filter id=9', (done) => {
        chai.request(urlPrincipal)
            .get('/api/character/9')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                assert.equal(res.body.id,"9");
                assert.equal(res.body.gender,"Male");
                done();  
            });
    });
    
});

describe('Get All Character Wrong:', () => {
    it('Path wrong /api/character/algo', (done) => {
        chai.request(urlPrincipal)
            .get('/api/character/algo')
            .end(function (err, res) {
                expect(res).to.have.status(500);
                assert.equal(res.body.error,"Hey! you must provide an id");
                done();  
            });
    });
    
});

describe('Get Filter Not Found:', () => {
    it('Filter name=Black Rick2 not found and status=alive', (done) => {
        chai.request(urlPrincipal)
            .get('/api/character/?name=Black Rick2&status=alive')
            .end(function (err, res) {
                expect(res).to.have.status(404);
                assert.equal(res.body.error,"There is nothing here");
                done();  
            });
    });
    
});

describe('Get a Single Character, id Not Found:', () => {
    it('Filter id=1500 no found', (done) => {
        chai.request(urlPrincipal)
            .get('/api/character/1500')
            .end(function (err, res) {
                expect(res).to.have.status(404);
                assert.equal(res.body.error,"Character not found");
                done();  
            });
    });
    
});
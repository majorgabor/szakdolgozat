import chai, { expect } from 'chai';
import sinon from 'sinon';

import { fetchAjax } from '../actions/fetchAjax.js';

describe('fetchAjax.js', () => {

    describe('fetchAjax()', () => {
        let server;
        let callback2;
        let onAjaxSuccess;

        beforeEach(() => {
            server = sinon.createFakeServer();
            server.respondImiditly = true;
            callback2 = sinon.spy();
            onAjaxSuccess = () => {
                return(data) =>{
                    callback2(data);
                };   
            };
        });
        
        afterEach(() => {
            server.restore();
            onAjaxSuccess = null;
        });

        it('fetch works right for GET method on 200 OK', () => {
            server.respondWith(
                'GET',
                'http://localhost:80/szakdolgozat/back-end/API/url/path/endpoint',
                [ 200, { 'Content-Type': 'application/json'}, '[{"data":"yes"}]']
            );
            fetchAjax('url/path/endpoint', 'GET', null, onAjaxSuccess());
            setTimeout(function() {
                expect(callback2.called).to.be.true;
                expect(callback2.withArgs('{"data":"yes"}')).to.be.true;            
            }, 10);
        });

        it('fetch works right for GET method on 400 BadRequest', () => {
            server.respondWith(
                'GET',
                'http://localhost:80/szakdolgozat/back-end/API/url/path/endpoint',
                [ 400, { 'Content-Type': 'application/json'}, '[{"data":"No"}]']
            );
            fetchAjax('url/path/endpoint', 'GET', null, onAjaxSuccess());
            setTimeout(function() {
                expect(callback2.called).to.be.true;
                expect(callback2.withArgs('{"data":"No"}')).to.be.true;            
            }, 10);
        });

        it('fetch works right for POST method on 200 OK', () => {
            server.respondWith(
                'POST',
                'http://localhost:80/szakdolgozat/back-end/API/url/path/endpoint',
                [ 200, { 'Content-Type': 'application/json'}, '[{"data":"yes"}]']
            );
            fetchAjax('url/path/endpoint', 'POST', '{"data":"post"}', onAjaxSuccess());
            setTimeout(function() {
                expect(callback2.called).to.be.true;
                expect(callback2.withArgs('{"data":"yes"}')).to.be.true;            
            }, 10);
        });

        it('fetch works right for POST method on 400 BadRequest', () => {
            server.respondWith(
                'POST',
                'http://localhost:80/szakdolgozat/back-end/API/url/path/endpoint',
                [ 400, { 'Content-Type': 'application/json'}, '[{"data":"No"}]']
            );
            fetchAjax('url/path/endpoint', 'POST', '{"data":"post"}', onAjaxSuccess());
            setTimeout(function() {
                expect(callback2.called).to.be.true;
                expect(callback2.withArgs('{"data":"No"}')).to.be.true;            
            }, 10);
        });

        it('fetch works right for not supported method 504', () => {
            server.respondWith(
                'DELETE',
                'http://localhost:80/szakdolgozat/back-end/API/url/path/endpoint',
                [ 504, { 'Content-Type': 'application/json'}, '[{"data":"not supported"}]']
            );
            fetchAjax('url/path/endpoint', 'DELETE', null, onAjaxSuccess());
            setTimeout(function() {
                expect(callback2.called).to.be.true;
                expect(callback2.withArgs(504)).to.be.true;
            }, 10);
        });
    });
});
const assert = require('assert');

Feature('Liking Restos');

Scenario('liking one resto', async ({ I }) => {
    I.amOnPage('/');

    I.waitForVisible('.resto-item__content');
    I.seeElement('.resto-item__content a');
    const firstResto = locate('.resto-item__content a').first();
    const firstRestoName = await I.grabTextFrom(firstResto);

    I.click(firstResto);

    I.waitForElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/like');
    I.seeElement('.resto-item');
    const likedRestoName = await I.grabTextFrom('.resto-item__content');

    assert.strictEqual(firstRestoName, likedRestoName);
});

Scenario('unliking one resto', async ({ I }) => {
    I.amOnPage('/');
    I.waitForVisible('.resto-item__content');
    I.seeElement('.resto-item__content a');

    const firstResto = locate('.resto-item__content a').first();
    const firstRestoName = await I.grabTextFrom(firstResto);

    I.click(firstResto);

    I.waitForElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/like');
    I.seeElement('.resto-item');

    const likedRestoName = await I.grabTextFrom('.resto-item__content');
    assert.strictEqual(firstRestoName, likedRestoName);

    I.seeElement('.resto-item__content a');
    const firstRestoFav = locate('.resto-item__content a').first();
    I.click(firstRestoFav);

    I.waitForElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/like');
    I.dontSeeElement('.resto-item');
});

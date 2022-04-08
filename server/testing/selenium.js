const webdriver = require("selenium-webdriver");

const { By, until } = webdriver; 

async function endToEndTest() {
    let driver = new webdriver.Builder().forBrowser('chrome').build();
    // open browser and go to locally hosted app
    await driver.get("http://localhost:3000");

    // login
    await driver.findElement(By.name('email')).sendKeys('alanregann@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('password');
    await driver.findElement(By.id('loginSubmit')).click();

    // wait until tasks page is loaded
    await driver.wait(until.urlContains('/tasks'), 15000);
    // open module modal
    driver.findElement(By.id('createModule')).click();
    // wait until modal is loaded
    await driver.wait(until.elementLocated(By.className('moduleModal')), 15000);
    // create module
    driver.findElement(By.id("moduleName")).sendKeys('SeleniumTestModule');
    driver.findElement(By.id('moduleCAvalue')).sendKeys('40');
    driver.findElement(By.id('moduleColour')).sendKeys('Green');
    driver.findElement(By.id('AddModule')).click();
    // refresh the page (to clear stale dom references)
    await driver.sleep(3 * 1000);
    driver.navigate().refresh();

    // open task modal
    driver.findElement(By.id('createTask')).click();
    // wait until task modal is loaded
    await driver.wait(until.elementLocated(By.className('taskModal')), 15000);
    // create task
    driver.findElement(By.id('moduleName')).sendKeys('SeleniumTestModule');
    driver.findElement(By.id('taskDesc')).sendKeys('SeleniumTestTask');
    driver.findElement(By.id('taskDue')).sendKeys('15/04/2022');
    driver.findElement(By.id('taskPriority')).sendKeys('High');
    driver.findElement(By.id('taskCAValue')).sendKeys('20');
    driver.findElement(By.id('AddTask')).click();
    // refresh the page (to clear stale dom references)
    await driver.sleep(3 * 1000);
    driver.navigate().refresh();

    // get schedule page link and click it
    driver.findElement(By.id('schedules')).click();
    // create schedule event
    driver.findElement(By.className('rbc-day-bg rbc-today')).click();
    await driver.wait(until.elementLocated(By.className('rbc-day-bg rbc-today')), 15000).click();

    // wait until event modal is loaded
    await driver.wait(until.elementLocated(By.className('eventModal')), 15000);
    driver.findElement(By.id('task_name')).sendKeys('SeleniumTestTask');
    driver.findElement(By.id('AddEvent')).click();
}

endToEndTest();

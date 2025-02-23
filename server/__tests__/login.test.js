import { Builder, By, until } from 'selenium-webdriver';
import fs from 'fs';
import path from 'path';

/**
 * Pausa la ejecución durante un tiempo determinado.
 * @param {number} ms - Milisegundos a esperar.
 * @returns {Promise<void>} Promesa que se resuelve después del tiempo especificado.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Ejecuta una prueba automatizada de inicio de sesión en la aplicación web.
 * Utiliza Selenium WebDriver para interactuar con la página de inicio de sesión.
 * Captura capturas de pantalla en caso de error.
 * @returns {Promise<void>} Promesa que representa la ejecución de la prueba.
 */
async function testLogin() {


    const driver = await new Builder()
        .forBrowser('chrome')

        .build();

    try {
        console.log('Navegando a la página de inicio de sesión');
        await driver.get('http://localhost:3000/login');
        await sleep(3000);

        console.log('Introduciendo email');
        await driver.findElement(By.name('email')).sendKeys('usuariopruebas@pruebas.com');
        await sleep(3000);

        console.log('Introduciendo contraseña');
        await driver.findElement(By.name('password')).sendKeys('123456789');
        await sleep(3000);

        console.log('Haciendo clic en el botón de inicio de sesión');
        await driver.findElement(By.css('button[type="submit"]')).click();
        await sleep(3000);

        console.log('Esperando la redirección a /search');
        await driver.wait(until.urlIs('http://localhost:3000/search'), 20000);
        await sleep(3000);

        console.log('Verificando redirección exitosa');
        const currentUrl = await driver.getCurrentUrl();
        if (currentUrl === 'http://localhost:3000/search') {
            console.log('La prueba de inicio de sesión fue exitosa y se redirigió a /search.');
        } else {
            console.log('La prueba de inicio de sesión falló. No se redirigió a /search.');
        }
    } catch (error) {
        console.error('Error durante la prueba:', error);
        const screenshot = await driver.takeScreenshot();
        const screenshotPath = path.join('__tests__', 'error-screenshot.png');
        fs.writeFileSync(screenshotPath, screenshot, 'base64');
        console.log(`Captura de pantalla guardada en ${screenshotPath}`);
    } finally {
        await driver.quit();
    }
}

// Ejecuta la prueba de inicio de sesión
// Maneja cualquier error no controlado en la ejecución.
testLogin().catch(console.error);

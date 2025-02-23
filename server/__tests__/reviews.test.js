import { Builder, By, until, Key } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

/**
 * Función principal para probar la funcionalidad de la página de reseñas.
 * Esta función automatiza el proceso de inicio de sesión, navegación y envío de una reseña.
 */
(async function testReviewPage() {
    // Crear una instancia del navegador Chrome
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options()) // Configurar opciones de Chrome
        .build();

    try {
        // Maximizar la ventana del navegador
        await driver.manage().window().maximize();

        /**
         * Iniciar sesión en la aplicación.
         * Navega a la página de login, ingresa las credenciales y hace clic en el botón de submit.
         */
        await driver.get('http://localhost:3000/login'); // Navegar a la página de login

        // Localizar los campos de entrada y el botón de submit
        let usernameInput = await driver.findElement(By.name('email')); // Campo de email
        let passwordInput = await driver.findElement(By.name('password')); // Campo de contraseña
        let loginButton = await driver.findElement(By.css('button[type="submit"]')); // Botón de submit

        // Ingresar las credenciales y hacer clic en el botón de login
        await usernameInput.sendKeys('usuariopruebas@pruebas.com');
        await passwordInput.sendKeys('123456789');
        await loginButton.click();

        /**
         * Esperar a que se redirija a la página de búsqueda (/search).
         * Se espera un máximo de 30 segundos para que la URL cambie.
         */
        await driver.wait(until.urlContains('/search'), 30000);
        await driver.sleep(5000); // Esperar 5 segundos para asegurar que la página esté cargada

        /**
         * Navegar a la página de perfil (/profile).
         * Se espera un máximo de 30 segundos para que la URL cambie.
         */
        await driver.get('http://localhost:3000/profile');
        await driver.wait(until.urlContains('/profile'), 30000);
        await driver.sleep(5000); // Esperar 5 segundos para asegurar que la página esté cargada

        /**
         * Navegar a la página de favoritos (/favorites).
         * Se espera un máximo de 30 segundos para que la URL cambie.
         */
        await driver.get('http://localhost:3000/favorites');
        await driver.wait(until.urlContains('/favorites'), 30000);
        await driver.sleep(5000); // Esperar 5 segundos para asegurar que la página esté cargada

        /**
         * Buscar los elementos del formulario de reseña.
         * Se espera un máximo de 40 segundos para que los elementos estén disponibles.
         */
        const reviewInput = await driver.wait(until.elementLocated(By.id('reviewText')), 40000); // Campo de texto de la reseña
        const submitButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 40000); // Botón de submit

        /**
         * Interactuar con los campos de reseña.
         * Escribe una reseña y selecciona una calificación.
         */
        await reviewInput.sendKeys('Prueba de reseña de película'); // Escribir una reseña
        await driver.sleep(3000); // Esperar 3 segundos para asegurar que la reseña se escriba correctamente

        // Seleccionar la opción de calificación (en este caso, '3')
        const option = await driver.wait(until.elementLocated(By.xpath("//option[@value='3']")), 40000);
        await option.click(); // Hacer clic en la opción con valor 3

        /**
         * Desplazar la página hasta el botón de envío.
         * Esto asegura que el botón esté visible en la pantalla.
         */
        await driver.executeScript('arguments[0].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});', submitButton);
        await driver.sleep(3000); // Esperar 3 segundos para asegurar que el botón esté visible

        /**
         * Esperar a que el botón de envío esté visible y habilitado.
         * Se espera un máximo de 6 segundos para cada condición.
         */
        await driver.wait(until.elementIsVisible(submitButton), 6000);
        await driver.wait(until.elementIsEnabled(submitButton), 6000);

        // Hacer clic en el botón de envío
        await submitButton.click();
        await driver.sleep(3000); // Esperar 3 segundos para que la reseña se envíe

        /**
         * Recargar la página para asegurarse de que la última reseña se muestre.
         * 
         */
        await driver.navigate().refresh();
        await driver.sleep(5000); 

        /**
         * Seleccionar todos los <div> con la clase .mb-3.
         * Estos <div> representan las reseñas en la página.
         */
        const reviewDivs = await driver.findElements(By.css('.mb-3'));
        console.log('Número de reseñas:', reviewDivs.length);

        // Verificar que hay al menos una reseña
        if (reviewDivs.length === 0) {
            console.log('No se encontraron reseñas.');
            return;
        }

        /**
         * Tomar el último <div> de la lista de reseñas.
         * Este <div> contiene la última reseña añadida.
         */
        const lastReviewDiv = reviewDivs[reviewDivs.length - 1];

        /**
         * Seleccionar el primer <p> dentro del último <div>.
         * Este <p> contiene el texto de la reseña.
         */
        const reviewText = await lastReviewDiv.findElement(By.css('p:first-child'));
        await driver.wait(until.elementIsVisible(reviewText), 8000); // Esperar a que el texto sea visible

        /**
         * Verificar que la reseña se ha agregado correctamente.
         * Compara el texto de la reseña con el texto esperado.
         */
        const reviewContent = await reviewText.getText();
        console.log('Texto de la última reseña:', reviewContent);

        if (reviewContent.includes('Prueba de reseña de película')) {
            console.log('Test Passed!');
        } else {
            console.log('Test Failed!');
        }

        // Esperar 6 segundos antes de cerrar el navegador
        await driver.sleep(6000);

    } finally {
        /**
         * Cerrar el navegador al finalizar la prueba.
         * Esto asegura que los recursos se liberen correctamente.
         */
        await driver.quit();
    }
})();
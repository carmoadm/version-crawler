const puppeteer = require('puppeteer');

async function getVersion(objetoMunicipio) {
  const urlGeo = objetoMunicipio.url
  const geoProject = objetoMunicipio.projeto
  let version = ''
  const browser = await puppeteer.launch( { headless: true } )
  const page = await browser.newPage()
    
  try {
    await page.goto(urlGeo)
    if (geoProject === 'old') {
      version = await page.$eval('#versao', element => element.textContent)
      version = version.split(" ")
      version = version[1]
      console.log('Versão :>> ', version)
    } else {
      version = await page.$eval('.versao-info', element => element.textContent)
      console.log('Versão :>> ', version);
    }
  }
  catch (e) {
    console.log('e :>> ', e);           
  }
      await browser.close();
}
  
  module.exports = getVersion
  
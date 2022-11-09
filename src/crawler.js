const puppeteer = require('puppeteer');
const fs = require('fs');
const counties = require('../municipios.json')

async function getVersion() {
  const browser = await puppeteer.launch( { headless: true } )
  const page = await browser.newPage()
  const versionResult = []

  for ( let i = 0; i < counties.length; i++) {
    const county = counties[i]
    const urlchangelog = county.url + '/changelog.html'
    console.log('== Analisando versão do município de', county.municipio)
    const municipio = county.municipio
    const url = county.url
    const brasao = county.brasao
    let version = ''
    let date = ''
    const suporte = county.suporte
    

    try{
      await page.goto(urlchangelog)
      const versionBase = await page.$eval('.content h2:nth-of-type(2)', element => element.textContent)
      const versaoSlice = versionBase.slice(0, 6)
      version = versaoSlice
      const dateSlice = versionBase.slice(9, 26)
      date = dateSlice
         
      const result = { municipio, urlchangelog, version, date, url, brasao, suporte}
      versionResult.push(result)
    } catch (e) {
      version = 'xxx'
      date = 'xxx'
      const result = {municipio, urlchangelog, version, date, url, brasao, suporte }
      versionResult.push(result)
    }
  }
  console.table(versionResult)

  //escrevendo os dados em um arquivo local (json)
  fs.writeFile('versao_data.json', JSON.stringify(versionResult, null, 2), err => {
    if(err) throw new Error('Something went wrong')

    console.log('Well done! Saved data')
  })

await browser.close();

}
// getVersion()
module.exports = getVersion
const puppeteer = require('puppeteer');
const fs = require('fs');
const counties = require('../municipios.json')

async function getVersion() {
  const browser = await puppeteer.launch( { headless: true } )
  const page = await browser.newPage()
  const versionResult = []
  qtdMunicipios = counties.length

  for ( let i = 0; i < counties.length; i++) {
    const county = counties[i]
    console.log('== Analisando versão do município de', county.municipio)
    const urlchangelog = county.url + '/changelog.html'
    const municipio = county.municipio
    const url = county.url
    const brasao = county.brasao
    let version = county.version
    let date = county.date
    let success = county.success
    const suporte = county.suporte
    

    try{
      await page.goto(urlchangelog)
      const versionBase = await page.$eval('.versao-info', element => element.textContent)
      const versaoSlice = versionBase.slice(0, 6)
      version = versaoSlice
      const dateSlice = versionBase.slice(9, 26)
      date = dateSlice
      success = true
         
      const result = { municipio, urlchangelog, version, date, url, brasao, suporte, success}
      versionResult.push(result)
    } catch (e) {
      version = county.version
      date = county.date
      success = false
      const result = {municipio, urlchangelog, version, date, url, brasao, suporte, success }
      console.log('result :>> ', result);
      versionResult.push(result)
    }
  }
  // console.table(versionResult)
  const versionResultQtd = versionResult.length
  console.log('versionResultQtd :>> ', versionResultQtd);
  console.log('qtdMunicipios :>> ', qtdMunicipios);
  
  if (versionResultQtd == qtdMunicipios) {
    //escrevendo os dados em um arquivo local (json)
    fs.writeFile('municipios.json', JSON.stringify(versionResult, null, 2), err => {
      if(err) throw new Error('Something went wrong')
  
      console.log('Well done! Saved data')
    })
  }

await browser.close();

}
// getVersion()
module.exports = getVersion
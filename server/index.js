const App = require('express')();
const cors = require('cors')
const puppeteer = require('puppeteer')

const PORT = 4000;
const arrayOfElem = ['h1', 'h2', 'h3', 'h4', 'h5', /* 'h6', */ 'p', 'span', 'a', 'body']

//middlewares
App.use(cors())


//APIS
App.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome to Pptr' })
})


App.get('/get-keyword-details', async (req, res) => {
    const { keyword, websiteURL } = req.query;

    if (!keyword) {
        return res.status(400).json({ success: false, message: 'Keyword is empty' })
    }
    if (!websiteURL) {
        return res.status(400).json({ success: false, message: 'Website URL is empty' })
    }
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0)
        await page.goto(websiteURL)
        const arrayOfPromises = [
            page.$eval("h1", el => el.textContent),
            page.$eval("h2", el => el.textContent),
            page.$eval("h3", el => el.textContent),
            page.$eval("h4", el => el.textContent),
            page.$eval("h5", el => el.textContent),
            // page.$eval("h6", el => el.textContent),
            page.$eval("p", el => el.textContent),
            page.$eval("span", el => el.textContent),
            page.$eval("a", el => el.textContent),
            page.$eval("body", el => el.textContent),
        ]

        const arrayOfElementsData = await Promise.all([
            ...arrayOfPromises.map((p => p.catch(e => e)))
        ]);

        const result = arrayOfElementsData.map((val, index) => {
            if (val instanceof Error) {
                return {
                    count: 0,
                    keyword,
                    tag: arrayOfElem[index],
                    tagFound: false,
                }
            }
            else {
                const regex = new RegExp(keyword, 'i')
                return {
                    count: (val.match(regex) || []).length,//match element cant take a variable name that's why using instance of regex ----> Prob => count: (val.match(/Download/g) || []).length,
                    keyword,
                    tag: arrayOfElem[index],
                    tagFound: true,
                }
            }
        })

        return res.status(200).json({ success: true, data: result })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }

})



//Sever Listenting
App.listen(PORT, () => {
    console.log(`Sever listenting on PORT:${PORT}`)
})
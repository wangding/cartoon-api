#!/usr/bin/env node

const axios     = require('axios'),
      path      = require('path'),
      cheerio   = require('cheerio'),
      getUnigID = require('../lib/util').getUniqID,
      baseURL   = 'http://www.dm5.com/',
      DIR  = '../../crawler/data',
      fs   = require('fs'),
      log  = console.log,
      area = { gangtai: 1, rihan: 2, dalu: 3, oumei: 4 },
      { Tag, Author, Book } = require('../models')

var data, fileName, areaID, i = 1, url, res, tip, summary, tags

async function initData() {
  await getData()
}

initData()

async function getData() {
  var files = fs.readdirSync(DIR)

  for(var t1=0; t1<files.length; t1++) {
    var file = files[t1];
    fileName = path.join(DIR, file)
    areaID = area[file.split('-')[0]]

    data = fs.readFileSync(fileName).toString('utf8')
    data = JSON.parse(data)
    data = data.UpdateComicItems

    for(var t2=0; t2<data.length; t2++) {
      var bk = data[t2]
      if(bk.Title.length < 5 && bk.Star >= 4) {
        bk.areaID = areaID
        await getInfoFromPage(bk)
        await saveTags(bk)
        await saveAuthors(bk)
        await saveBooks(bk)
        print(bk)
      }
    }
  }
}

function print(bk) {
  var isTop = bk.Star === 5 ? 1: 0;

  log(`id:\t\t${i++}`)
  log(`unique_id:\t${getUnigID(bk.Title)}`)
  log(`author:\t\t${bk.Author.join(' ,')}`)
  log(`book_name:\t${bk.Title}`)
  log(`last_time:\t${bk.LastUpdateTime}`)
  log(`is_top:\t\t${isTop}`)
  log(`tags:\t\t${bk.tags}`)
  log(`summary:\t${bk.summary}`)
  log(`end:\t\t${bk.end}`)
  log(`area_id:\t${bk.areaID}`)
  log()
}

async function saveTags(bk) {
  bk.tags.split('|').forEach(async(tg) => {
    if(tg === '') return;

    await Tag.findOrCreate({
      where: { tag_name: tg }
    })
  })
}

async function saveAuthors(bk) {
  bk.Author.forEach(async(au) => {
    if(au === '') return;

    await Author.findOrCreate({
      where: { author_name: au }
    })
  })
}

async function saveBooks(bk) {
  await Book.create({
    unique_id: getUnigID(bk.Title),
    book_name: bk.Title,
    last_time: bk.LastUpdateTime,
    tags:      bk.tags,
    summary:   bk.summary,
    end:       bk.end,
    is_top:    bk.Star === 5 ? 1: 0,
    area_id:   bk.areaID
  })
}

async function getInfoFromPage(bk) {
  url = baseURL + bk.UrlKey + '/'
  res = await axios.get(url)
  res = res.data

  var $ = cheerio.load(res)
  tip = $('body').find('.tip>.block')
  summary = $('body').find('.info>.content')
  tags = $(tip[1]).text().split(' ').filter(item => item !== '')
  tags.shift()
  bk.tags = tags.join('|')
  bk.end = $(tip[0]).text().split('：')[1] === '连载中' ? 0: 1
  bk.summary = summary.text()
}

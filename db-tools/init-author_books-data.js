#!/usr/bin/env node

const path  = require('path'),
      { getUniqID } = require('../lib/util'),
      fs    = require('fs'),
      log   = console.log,
      {
        Book,
        Author,
        AuthorBook
      } = require('../models'),
      DIR = '../../crawler/data'

async function initData() {
  await initBookData()
}

var data, fileName, i=1

async function initBookData() {
  var files = fs.readdirSync(DIR)

  for(var t1=0; t1<files.length; t1++) {
    var file = files[t1]
    fileName = path.join(DIR, file)

    data = fs.readFileSync(fileName).toString('utf8')
    data = JSON.parse(data)
    data = data.UpdateComicItems

    for(var t2=0; t2<data.length; t2++) {
      var bk = data[t2]
      if(bk.Title.length < 5 && bk.Star >= 4) {
        await saveAuBook(bk)
        print(bk)
      }
    }
  }
}

function print(bk) {
  log(`id:\t\t${i++}`)
  log(`unique_id:\t${getUniqID(bk.Title)}`)
  log(`author:\t\t${bk.Author.join(', ')}`)
  log(`book_name:\t${bk.Title}`)
  log()
}

async function saveAuBook(bk) {
  let bookID = await Book.findOne({
    where: {unique_id: getUniqID(bk.Title)}
  })

  bookID = bookID.dataValues.id

  bk.Author.forEach(async (au) => {
    let authorID = await Author.findOne({
      where: {author_name: au}
    })

    authorID = authorID.dataValues.id

    await AuthorBook.create({
      author_id: authorID,
      book_id:   bookID
    })
  })
}

initData();

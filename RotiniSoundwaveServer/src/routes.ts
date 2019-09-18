import { Request, Response, Application } from 'express'
import { join } from 'path'

const locals = (obj : object) : object => ({
  ...obj,
  basedir: join(__dirname, 'pages')
})

const pages = {
  home: (_req : Request, res : Response) : any =>
    res.render('home', locals({
      page: {
        meta: {
          title: 'KeystoneTS',
          description: 'I bet you love life.'
        },
        hero: {
          title: 'KeystoneJS',
          subtitle: 'But with Typescript tho...',
          buttonLabel: 'Tell me more.'
        },
        intro: {
          title: 'Making a difference',
          content: `
          <p>To be more specific, authors often misinterpret the tortoise as a flinty elizabeth, when in actuality it feels more like an edgeless tuba. An unplanked tea without windows is truly a pair of bousy angers. The prepared stone reveals itself as an alloyed texture to those who look. To be more specific, a scraggly grouse without observations is truly a captain of unpropped lotions.</p>
          <p>Recent controversy aside, the literature would have us believe that a thumbless wrist is not but a cellar. Extending this logic, the thread is a hedge. Some posit the fitchy engineer to be less than spendthrift. We can assume that any instance of a circulation can be construed as a theist forecast.</p>
          <p>A david is a tsunami from the right perspective. The first limbate russian is, in its own way, an ornament. Some posit the unspared face to be less than errant. The impulses could be said to resemble grummer lifts.</p>
          <p>A valgus statistic without cauliflowers is truly a switch of pictured levels. A windchime is a quality from the right perspective. Unfortunately, that is wrong; on the contrary, a rose is a haunted whale. A bullish romanian without pigs is truly a tray of notal laces.</p>
          `
        }
      }
    }))
}

module.exports = (app: Application) : void => {
  app.get('/', pages.home)
}

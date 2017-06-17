/**
 * Created by topeas on 2017/6/17.
 */
import Marked from 'marked'
import hljs from 'highlight.js'

const renderer = new Marked.Renderer()
export const toc = []

renderer.heading = function (text, level) {
  const slug = text.toLowerCase().replace(/\s+/g, '-')
  toc.push({
    level,
    slug,
    title: text,
  })
  return `<h${level}><a href='#${slug}' id='${slug}' class='anchor'></a><a href='#${slug}'>${text}</a></h${level}>`
}

Marked.setOptions({
  highlight(code, lang) {
    if (hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value
    }
    return hljs.highlightAuto(code).value
  },
  renderer,
})

export const marked = (text) => {
  const tok = Marked.lexer(text)
  text = Marked.parser(tok).replace(/<pre>/ig, '<pre class="hljs">')
  return text
}

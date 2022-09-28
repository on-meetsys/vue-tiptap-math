const mixinConvertToTiptap = {
  methods: {
      convertToTiptap(string) { //call this function when you want to convert pure HTML to tiptap format
          if (string === null || typeof string === 'undefined') {
              return ''
          }
          string = string.replaceAll('¬', '&#8202;')
          string = string.replaceAll('­', '&#8202;')
          string = this.convertKatex(string)
          return string
      },
      convertKatex(string) {
          string = string.replaceAll('\\[ ', '\\[')
          string = string.replaceAll(' \\]', '\\]')
          string = string.replaceAll(' $', '$')
          string = string.replaceAll('$ ', '$')

          let regex = /(\${1}((?!\$).)+?\${1})|(\${2}((?!\$).)+?\${2})|(\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])|(\[\\((?! ).){1}((?!\$).)*?((?! ).){1}\]\\)/gms;
          string = string.replace(regex, (match) => {
              let finalMatch
              if (match.includes('$$')) {
                  finalMatch = match.slice(2, -2)
              } else if (match.includes('$')) {
                  finalMatch = match.slice(1, -1)
              } else {
                  finalMatch = match.slice(2, -2)
              }
              finalMatch = finalMatch.replaceAll(/&lt;/g, '<').replaceAll(/&gt;/g, '>').replaceAll('&amp;', '&').replaceAll('&nbsp;', ' ')
              return '<span data-katex="true">$' + finalMatch + '$</span>'
          })

          string = string.replaceAll('&lt;', '<')
          string = string.replaceAll('&gt;', '>')

          return string
      },
  }
}

export default mixinConvertToTiptap

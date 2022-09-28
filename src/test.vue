<template>
  <div id="app">
    <vue-tiptap-katex
      ref="tiptap"
      v-model="content"
      :options="{}"
    />
    <hr>
    <hr>
    <div ref="printdiv">
      {{ content }}
    </div>
  </div>
</template>

<script>
import katex from 'katex'
import 'katex/dist/katex.min.css'
import VueTiptapKatex from './vue-tiptap-katex';
export default {
  name: 'Test',
  components: { VueTiptapKatex },
  methods: {
    computedHTML () {
      this.html = this.$refs.tiptap.editor.getHTML()
    },
  },
  data () {
    return {
      content: '',
      html: '',
    }
  },
  computed: {
    computedKatex () {
      let localInput = this.content
      let regex = /(\${1}((?!\$).)+?\${1})|(\${2}((?!\$).)+?\${2})|(\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])/gms;
      localInput = localInput.replace(regex, (match) => {
        return ' ' + match + ' '
      })
      localInput = localInput.replaceAll('\\[ ', '\\[')
      localInput = localInput.replaceAll(' \\]', ' \\]')
      localInput = localInput.replaceAll(' $', '$')
      localInput = localInput.replaceAll('$ ', '$')
      localInput = localInput.replace(regex, (match) => {
        let finalMatch
        if (match.includes('$$')) {
          finalMatch = match.slice(2, -2)
        } else if (match.includes('$')) {
          finalMatch = match.slice(1, -1)
        } else {
          finalMatch = match.slice(2, -2)
        }
        finalMatch = finalMatch.replaceAll(/&lt;/g, '<').replaceAll(/&gt;/g, '>').replaceAll('&amp;', '&');
        return katex.renderToString(finalMatch, {
          throwOnError: false,
          safe: true,
          trust: true
        })
      })
      return localInput
    }
  }
}
</script>

<style>
.tiptap-click-btn{
  width: 130px;
  height: 20px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
  7px 7px 20px 0px rgba(0,0,0,.1),
  4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
  width: 97.5%;
  text-align: center;
}
.btn-16 {
  border: none;
  color: #000;
}
.btn-16:after {
  position: absolute;
  content: "";
  width: 0;
  height: 100%;
  top: 0;
  left: 0;
  direction: rtl;
  z-index: -1;
  box-shadow:
      -7px -7px 20px 0px #fff9,
      -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002,
      4px 4px 5px 0px #0001;
  transition: all 0.3s ease;
}
.btn-16:hover {
  color: #000;
}
.btn-16:hover:after {
  left: auto;
  right: 0;
  width: 100%;
}
.btn-16:active {
  top: 2px;
}
.katex {
  direction: ltr;
}
</style>

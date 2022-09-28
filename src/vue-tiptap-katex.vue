<template>
  <div>
    <div class="tiptap-plus">
      <div
        v-if="editor"
        class="tiptap-header"
      >
        <toolbar
          v-if="editorOptions"
          ref="toolbar"
          :editor="editor"
          :options="editorOptions"
          @show-edit-table-modal="showDialog = !showDialog"
        />
      </div>
      <div 
        v-if="editor" 
        class="pa-0"
      >
        <editor-content :editor="editor" />
      </div>
    </div>
  </div>
</template>

<script>
import toolbar from './components/toolbar/toolbar'
import Shortkeys from './extension/Shortkeys/TiptapShortkeys';
import TiptapInteractiveKatexInline from './components/formula/TiptapInteractiveKatexInline'
import StarterKit from '@tiptap/starter-kit'
// import Vue from 'vue'
// import Notifications from 'vue-notification'

// Vue.use(Notifications)

import {
  Editor,
  EditorContent,
} from '@tiptap/vue-2'

import mixinConvertToTiptap from './mixins/convertToTiptap';

export default {
  name: 'VueTiptapKatex',
  mixins: [mixinConvertToTiptap],
  components: {
    EditorContent,
    toolbar,
  },
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    options: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    value: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      showDialog: false
    }
  },
  computed: {
    editorOptions () {
      const options = {
        mathliveOptions: {},
      }
      Object.assign(options, this.options)
      return options
    }
  },
  created () {
    this.$emit('input', this.convertToTiptap(this.value))
  },
  mounted() {
    let vueTiptapKatexInstance = this
    this.editor = new Editor({
      content: this.convertToTiptap(this.value),
      parseOptions: {
        preserveWhitespace: true
      },
      extensions: [
        StarterKit.configure({
          paragraph: {
            HTMLAttributes: { dir: 'auto' },
          }
        }),
        TiptapInteractiveKatexInline,
        Shortkeys,
      ],
      // triggered on every change
      onUpdate({ editor }) {
        vueTiptapKatexInstance.$emit('input', editor.getHTML())
      },
    })
    this.editor.editorOptions = this.editorOptions
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    setShowDialog (val){
      this.showDialog = val
    },
    elementFromString(value) {
      const element = document.createElement('div')
      element.innerHTML = value.trim()

      return element
    },
    setContent(pureHTML) {
      let string = this.convertToTiptap(pureHTML)
      this.editor.commands.setContent(string)
    },
    getContent() {
      return this.editor.getHTML()
    },
  },
}
</script>

<style>
.ProseMirror {
  outline: none;
  padding: 20px;
}

.tiptap-plus-container .v-card__title {
  border-bottom: solid 1px #dedede;
}

.tiptap-plus-container {
  width: 100%;
  margin: 0;
  border-radius: 10px;
  position: relative;
  background: white;
}

.tiptap-plus-container .v-progress-circular {
  position: absolute;
  z-index: 10;
  left: calc(50% - 25px);
  top: calc(50% - 25px);
}

.tiptap-plus .tiptap-header {
  background-color: #e9ecf4;
  padding: 8px;
}
</style>
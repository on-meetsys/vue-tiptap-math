<template>
  <div
    v-if="editor"
    class="tiptap-toolbar"
  >
    <ul>
      <li>
        <div
          class="toolbar-item mdi mdi-sigma toolbar-item-icon"
          @click="editor.chain().focus().insertContent(`<span data-katex='true'></span> `).run()"
        />
      </li>
    </ul>
    <!-- <interactive-info-table
      :dialog="dialog"
      @closedialog="dialog = false"
    /> -->
  </div>
</template>

<script>
// import InteractiveInfoTable from '../formula/TiptapInteractiveInfoTable';
import mixinConvertToTiptap from '../../mixins/convertToTiptap';

export default {
  name: 'Toolbar',
  components: {
    // InteractiveInfoTable
  },
  data() {
    return {
      dialog: false
    }
  },
  mixins: [mixinConvertToTiptap],
  mounted() {
  },
  props: {
    editor: {
      type: Object,
      default: () => {
      }
    },
    options: {
      type: Object,
      default: () => {
        return {
          poem: false
        }
      }
    }
  },
}
</script>

<style scoped lang="scss">

.vl {
  border-left: 1px dotted gray;
  white-space: nowrap;
  display: inline;
  margin-right: 12px;
  margin-left: 12px;
  padding-top: 12px;
  padding-bottom: 3px;
}

button:not(.v-btn) {
  border: solid 1px gray;
  padding: 5px;
  margin: 2px;
}

.formula-menu {
  border-radius: 5px !important;
}

.formula-menu .v-list-item,
.formula-menu .v-list {
  padding: 0;
}
</style>

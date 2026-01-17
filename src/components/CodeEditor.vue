<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { EditorState } from '@codemirror/state'
import { EditorView, basicSetup } from 'codemirror'
import { keymap } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editor = ref<EditorView | null>(null)
const container = ref<HTMLDivElement | null>(null)

const boundedHeight = EditorView.theme({
  '&': {
    minHeight: '300px',
    maxHeight: '300px',
  },
  '.cm-scroller': {
    overflowY: 'auto',
  },
})

onMounted(() => {
  editor.value = new EditorView({
    parent: container.value!,
    state: EditorState.create({
      doc: props.modelValue,
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        boundedHeight,
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            emit('update:modelValue', v.state.doc.toString())
          }
        }),
      ],
    }),
  })
})

watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value) return
    const current = editor.value.state.doc.toString()
    if (value !== current) {
      editor.value.dispatch({
        changes: {
          from: 0,
          to: current.length,
          insert: value,
        },
      })
    }
  }
)

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div
    ref="container"
    class="border rounded-md text-sm bg-background"
  ></div>
</template>
